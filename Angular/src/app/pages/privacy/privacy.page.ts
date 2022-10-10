import { Component, OnInit } from '@angular/core';
import { ContentsquareCDVPlugin } from '@contentsquare/cordova-plugin-types';
import { LocalStorageService } from 'src/app/services/local-storage.service';

declare const ContentsquarePlugin: ContentsquareCDVPlugin;

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})

// This class showcases how to use privacy-related APIs.
// You are responsible for creating the UI asking the user for his consent, and then calling the appropriate Contentsquare function.
export class PrivacyPage implements OnInit {
  userConsent: boolean;

  constructor(private localStorageSvc: LocalStorageService) { }

  // Get the local stored value of the userConsent to sync with the toggle button
  ngOnInit() {
    this.userConsent = this.localStorageSvc.getUserConsent();
    console.log('userConsent:', this.userConsent);
  }

  optIn() {
    ContentsquarePlugin.optIn(() => {
      console.log('Opted in');
    }, (err) => {
      console.log('Opted out err =>', err);
    });
  }

  optOut() {
    ContentsquarePlugin.optOut(() => {
      console.log('Opted out');
    }, (err) => {
      console.log('Opted out err =>', err);
    });
  }

  // We store locally if the user has accepted the Privacy Policy.
  toggleAcceptPolicy(ev) {
    if (ev.detail.checked === true) {
      this.localStorageSvc.acceptPolicy();
      this.optIn();
    } else {
      this.localStorageSvc.denyPolicy();
      this.optOut();
    }
  }

}
