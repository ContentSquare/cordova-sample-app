import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-screen-views',
  templateUrl: './screen-views.page.html',
  styleUrls: ['./screen-views.page.scss'],
})

// This class showcases how to implement Screenviews in different possible contexts
export class ScreenViewsPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goToPage(url) {
    this.navCtrl.navigateForward('screen-views/' + url);
  }

}
