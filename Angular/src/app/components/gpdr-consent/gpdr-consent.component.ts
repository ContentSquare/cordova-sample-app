import { Component, OnInit } from '@angular/core';
import { ContentsquareCDVPlugin } from '@contentsquare/cordova-plugin-types';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';

declare var ContentsquarePlugin: ContentsquareCDVPlugin;

@Component({
  selector: 'app-gpdr-consent',
  templateUrl: './gpdr-consent.component.html',
  styleUrls: ['./gpdr-consent.component.scss'],
})
export class GpdrConsentComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private localStorageSvc: LocalStorageService) { }

  ngOnInit() {}

  accept(){
    console.log('Accept');
    this.localStorageSvc.acceptPolicy();
    this.localStorageSvc.onFirstLaunch();
    this.optIn();
    this.modalCtrl.dismiss();
  }

  reject(){
    console.log('Reject');
    this.localStorageSvc.denyPolicy();
    this.localStorageSvc.onFirstLaunch();
    this.optOut();
    this.modalCtrl.dismiss();
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

}
