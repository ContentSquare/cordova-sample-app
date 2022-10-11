import { Component } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ContentsquareCDVPlugin } from '@contentsquare/cordova-plugin-types';
import { GdprConsentComponent } from './components/gdpr-consent/gdpr-consent.component';
import { LocalStorageService } from './services/local-storage.service';

declare const window: any;
declare const ContentsquarePlugin: ContentsquareCDVPlugin;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isFirstLaunch = this.localStorageSvc.isFirstLaunch();
  userConsent = this.localStorageSvc.getUserConsent();

  constructor(private platform: Platform, private modalCtrl: ModalController, private localStorageSvc: LocalStorageService) {
    this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      console.log('isFirstLaunch: ', this.isFirstLaunch);

      // Handle incoming urls to monitor CS in-app activation
      window.handleOpenURL = (url) => {
        console.log('received url: ' + url);

        ContentsquarePlugin.handleURL(url, () => {
          console.log('Success');
        }, (message) => {
          console.log(message);
        });
      };

      // At first launch, we present a modal to ask the user to accept the Privacy Policy.
      if (this.isFirstLaunch) {
        this.openGDPR();
      }
    });
  }

  openGDPR() {
    this.modalCtrl
      .create({
        component: GdprConsentComponent,
        backdropDismiss: false
      })
      .then((modal) => {
        modal.present();
      });
  }
}
