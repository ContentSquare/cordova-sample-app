import { Component } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ContentsquareCDVPlugin } from '@contentsquare/cordova-plugin-types';
import { GdprConsentComponent } from './components/gdpr-consent/gdpr-consent.component';
import { LocalStorageService } from './services/local-storage.service';
import {
  NavigationEnd, NavigationError, Router,
  Event,
  RoutesRecognized
} from '@angular/router';
import { ContentsquareService } from './services/contentsquare.service';

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

  constructor(private platform: Platform, private modalCtrl: ModalController, private localStorageSvc: LocalStorageService, private router: Router, private csService: ContentsquareService) {
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

      //Send 1st event manually sendScreenName when platform is ready
      this.csService.sendScreenName('/home');

      // We subscribe to Angular router events. When the URL changes, we send the corresponding screen name
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          if(event.url !== '/'){
            // Some cases need "urlAfterRedirects" value, for example when after a tab container is loaded, it will redirect to one of its tab
            this.csService.sendScreenName(event.urlAfterRedirects);
          }
        }

        if (event instanceof NavigationError) {
          // Present error to user
          console.log(event.error);
        }
      });

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
