#!/usr/bin/env groovy

def initAndroidProperties() {
    echo "initAndroidProperties"
    env.GRADLE_HOME = env.HOME + '/.gradle'
    env.ANDROID_SDK = env.HOME + '/Library/Android/sdk'
    env.ANDROID_SDK_ROOT = env.ANDROID_SDK
    env.JAVA_HOME = '/Users/jenkins/.sdkman/candidates/java/current'
    env.JENKINS_NODE_COOKIE = 'dontKillMe' // this is necessary for the Gradle daemon to be kept alive
}

def initPathsVariables() {  
    echo "initPathsVariables"
    env.ARTEFACT_MAIN_PATH = pwd() + '/Artefacts'
    env.ANDROID_ARTEFACT_PATH = env.ARTEFACT_MAIN_PATH + '/android'
    env.IOS_ARTEFACT_PATH = env.ARTEFACT_MAIN_PATH + '/ios'
    env.ANDROID_QA_ARTEFACT_PATH = env.ANDROID_ARTEFACT_PATH + '/qa'
    env.IOS_QA_ARTEFACT_PATH = env.IOS_ARTEFACT_PATH + '/qa'
}

def currentBranchName() {
    return env.CHANGE_BRANCH ?: env.BRANCH_NAME
}

def isMainBranch() {
    return currentBranchName().endsWith('main')
}

def isReleaseBranch() {
    return currentBranchName().startsWith('release')
}

def shouldAutomaticallyRunIntegrationTests() {
    return isMainBranch() || isReleaseBranch() || params.runIntegrationTests
}

pipeline {

    agent {
        label 'bridge'
    }

    environment {
        PATH = "/usr/local/sbin:~/.rbenv/shims:~/Library/Python/3.7/bin:" +
                "~/.nvm/versions/node/v14.19.2/bin:${env.ANDROID_SDK}:$PATH"
        GITHUB_TOKEN = credentials('contentsquare-ci-secret')
        SLACK_CHANNEL = "react-native"
        ARTIFACTORY_CREDS = credentials('artifactory')
        NPM_TOKEN = credentials('npm-public-registry-token')
    }

    options {
        ansiColor('xterm')
        buildDiscarder(logRotator(artifactNumToKeepStr: '3'))
        timestamps()
    }

    parameters {
        booleanParam(name: 'runIntegrationTests', defaultValue: false, description: 'Run integration tests')
        booleanParam(name: 'publishIfReleaseReady', defaultValue: false, description: 'Allow to publish the bridge if we are on a release branch.')
    }

    stages {

        stage('init') {
            steps {
                script {
                    initAndroidProperties()
                    initPathsVariables()
                    sh label: "Retrieve Artifactory token.",
                            script: "curl -fs -u '${ARTIFACTORY_CREDS}' https://artifactory.csq.fr/api/npm/auth > ~/.npmrc"
                    env.PREVIOUSLY_SELECTED_XCODE = sh (
                        script: 'xcodes installed | grep Selected | cut -d "(" -f 1',
                        returnStdout: true
                    ).trim()
                    echo "Currently selected Xcode version is ${env.PREVIOUSLY_SELECTED_XCODE}"
                    sh label: "Set Xcode to 13.0",
                            script: "sudo xcodes select 13.0"
                }
            }
        }

        stage('setup environment') {
            steps {
                script {
                    sh label: "Create GRADLE_HOME folder",
                            script: "mkdir -p ${env.GRADLE_HOME}"
                    sh label: "Change rights for the GRADLE_HOME folder",
                            script: "sudo chown -R jenkins: ${env.GRADLE_HOME}"
                    sh label: "Change rights for the ANDROID_SDK folder",
                            script: "sudo chown -R jenkins: ${env.ANDROID_SDK}"
                    sh label: "Accept sdk build tools licenses",
                            script: "yes | sudo ${env.ANDROID_SDK}/tools/bin/sdkmanager --licenses"
                }
            }
        }

        stage('install dependencies') { 
            steps { 
                script {
                   
                    dir("Angular") { 
                        sh label: "Install npm packages",
                            script: "npm install"
                    }
                }
            }
        }

        stage('remove artefacts folder') { 
            steps { 
                script { 
                    sh label: "Remove Artefacts folder",
                        script: "rm -rf ${ARTEFACT_MAIN_PATH}"
                }
            }
        }

        stage('build ios and android QA artefacts') { 
            steps { 
                dir("Angular") { 
                    script {
                        sh label: "Remove platforms folder",
                            script: "rm -rf platforms"
                        sh label: "build ios QA artefact",
                            script: "npm run build-ios-qa"
                        sh label: "build android QA artefact",
                            script: "npm run build-android-qa"
                    }
                }
            }
        }

        stage('copy QA artefacts') { 
            steps { 
                script { 
                    ["${env.ANDROID_QA_ARTEFACT_PATH}",
                     "${env.IOS_QA_ARTEFACT_PATH}"].each {
                        sh label: "Create the `$it` folder",
                                script: "mkdir -p $it"
                    }

                    dir("Angular") { 
                        sh label: "Copy the QA .apk file to `${env.ANDROID_QA_ARTEFACT_PATH}`",
                            script: "cp -R platforms/android/app/build/outputs/apk/debug/*.apk ${env.ANDROID_QA_ARTEFACT_PATH}"
                        sh label: "Copy the QA .ipa file for device to `${env.IOS_QA_ARTEFACT_PATH}`",
                            script: "cp -R platforms/ios/build/device/cordova-angular-sample-app-qa.ipa ${env.IOS_QA_ARTEFACT_PATH}" 
                    }
                }
            }
        }

        stage('build ios and android artefacts') { 
            steps { 
                dir("Angular") { 
                    script {
                        sh label: "Remove platforms folder",
                            script: "rm -rf platforms"
                        sh label: "build ios artefact",
                            script: "npm run build-ios"
                        sh label: "build android artefact",
                            script: "npm run build-android"
                    }
                }
            }
        }

        stage('copy artefacts') { 
            steps { 
                script { 
                    ["${env.ANDROID_ARTEFACT_PATH}",
                     "${env.IOS_ARTEFACT_PATH}"].each {
                        sh label: "Create the `$it` folder",
                                script: "mkdir -p $it"
                    }

                    dir("Angular") { 
                        sh label: "Copy the .apk file to `${env.ANDROID_ARTEFACT_PATH}`",
                            script: "cp -R platforms/android/app/build/outputs/apk/release/*.apk ${env.ANDROID_ARTEFACT_PATH}"
                        sh label: "Copy the .app file for device to `${env.IOS_ARTEFACT_PATH}`",
                            script: "cp -R platforms/ios/build/emulator/cordova-angular-sample-app.app ${env.IOS_ARTEFACT_PATH}"
                    }
                }
            }
        }

        stage('zip and stash artefacts') { 
            steps { 
                script { 
                    dir("${env.ARTEFACT_MAIN_PATH}") { 
                        sh "tar -zcf Artefacts.tar ."
                        zip archive: true, glob: 'Artefacts.tar', zipFile: 'Artefacts.tar.zip'
                        stash includes: 'Artefacts.tar.zip', name: 'cordova-artefacts'
                    }
                }
            }
        }

       
    }
}