import { Component, OnInit } from '@angular/core';
import { ContentsquareCDVPlugin } from '@contentsquare/cordova-plugin-types';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';

declare var ContentsquarePlugin: ContentsquareCDVPlugin;

@Component({
  selector: 'app-gdpr-consent',
  templateUrl: './gdpr-consent.component.html',
  styleUrls: ['./gdpr-consent.component.scss'],
})
export class GdprConsentComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private localStorageSvc: LocalStorageService) { }

  ngOnInit() { }

  // We call the optIn() method of the SDK and store the value locally
  accept() {
    console.log('Accept');
    ContentsquarePlugin.optIn(() => {
      this.localStorageSvc.acceptPolicy();
      this.localStorageSvc.onFirstLaunch();
    }, (err) => {
      console.log('Opted out err =>', err);
    });
    this.modalCtrl.dismiss();
  }

  // We call the optOut() method of the SDK and store the value locally
  reject() {
    console.log('Reject');
    ContentsquarePlugin.optOut(() => {
      this.localStorageSvc.denyPolicy();
      this.localStorageSvc.onFirstLaunch();
    }, (err) => {
      console.log('Opted out err =>', err);
    });
    this.modalCtrl.dismiss();
  }

}
