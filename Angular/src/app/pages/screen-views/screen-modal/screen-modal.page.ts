import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalScreenComponent } from 'src/app/components/modal-screen/modal-screen.component';
import { ContentsquareService } from 'src/app/services/contentsquare.service';


@Component({
  selector: 'app-screen-modal',
  templateUrl: './screen-modal.page.html',
  styleUrls: ['./screen-modal.page.scss'],
})

// This class showcases how to implement Screenviews for modal pages
export class ScreenModalPage implements OnInit {

  constructor(private modalCtrl: ModalController, private router: Router, private csService: ContentsquareService) { }

  ngOnInit() {
  }

  async openModal() {

    const modal = await this.modalCtrl
      .create({
        component: ModalScreenComponent,
        backdropDismiss: false
      });

    // When the user close the modal, this screen sends its name again
    modal.onDidDismiss().then(() => {
      this.csService.sendScreenName(this.router.url);
    });

    modal.present();

    // When the user opens the modal, we send the screen name of the modal
    this.csService.sendScreenName(this.router.url + '/my-modal-screen');
  }



}
