const gulp = require('gulp');
const gutil = require('gulp-util');

const fs = require("fs");
const xml = require("xmldoc");

const appName = 'cordova-angular-sample-app';
const appNameQA = 'cordova-angular-sample-app-qa';
const packageName = 'com.contentsquare.sampleapp.cordova.angular';
const packageNameQA = 'com.contentsquare.sampleapp.cordova.angular.qa';


gulp.task('set-package-id-qa', gulp.series(async function () {
  var configXML = new xml.XmlDocument(fs.readFileSync("config.xml"));
  configXML.attr.id = packageNameQA;
  console.log("\nChanging package name to: " + configXML.attr.id + "\n");
  fs.writeFileSync("config.xml", configXML.toString())
}));

gulp.task('set-package-id', gulp.series(async function () {
  var configXML = new xml.XmlDocument(fs.readFileSync("config.xml"));
  configXML.attr.id = packageName;
  console.log("\nChanging package name to: " + configXML.attr.id + "\n");
  fs.writeFileSync("config.xml", configXML.toString())
}));

gulp.task('set-package-name-qa', gulp.series(async function () {
  var configXML = new xml.XmlDocument(fs.readFileSync("config.xml"));
  console.log("\nChanging app name to: " + appNameQA + "\n");
  configXML.childNamed("name").val = appNameQA;
  configXML.childNamed("name").children[0].text = appNameQA;
  configXML.childNamed("name").firstChild.text = appNameQA;
  configXML.childNamed("name").lastChild.text = appNameQA;
  configXML.childNamed("description").val = appNameQA;
  configXML.childNamed("description").children[0].text = appNameQA;
  configXML.childNamed("description").firstChild.text = appNameQA;
  configXML.childNamed("description").lastChild.text = appNameQA;
  fs.writeFileSync("config.xml", configXML.toString())
}));

gulp.task('set-package-name', gulp.series(async function () {
  var configXML = new xml.XmlDocument(fs.readFileSync("config.xml"));
  console.log("\nChanging app name to: " + appName + "\n");
  configXML.childNamed("name").val = appName;
  configXML.childNamed("name").children[0].text = appName;
  configXML.childNamed("name").firstChild.text = appName;
  configXML.childNamed("name").lastChild.text = appName;
  configXML.childNamed("description").val = appName;
  configXML.childNamed("description").children[0].text = appName;
  configXML.childNamed("description").firstChild.text = appName;
  configXML.childNamed("description").lastChild.text = appName;
  fs.writeFileSync("config.xml", configXML.toString())
}));


gulp.task('default', gulp.series('set-package-id', 'set-package-name'));
gulp.task('cordova-angular-sample-app', gulp.series('set-package-id', 'set-package-name'));
gulp.task('cordova-angular-sample-app-qa', gulp.series('set-package-id-qa', 'set-package-name-qa'));