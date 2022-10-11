import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-screen',
  templateUrl: './modal-screen.component.html',
  styleUrls: ['./modal-screen.component.scss'],
})
export class ModalScreenComponent implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {}

  onDismiss(){
    this.modalCtrl.dismiss();
  }

}
