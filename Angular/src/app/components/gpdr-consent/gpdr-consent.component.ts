import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';

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
    this.modalCtrl.dismiss();
  }

  reject(){
    console.log('Reject');
    this.localStorageSvc.denyPolicy();
    this.localStorageSvc.onFirstLaunch();
    this.modalCtrl.dismiss();
  }

}
