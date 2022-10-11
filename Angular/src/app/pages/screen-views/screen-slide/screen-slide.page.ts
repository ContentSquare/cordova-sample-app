import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { IonicSlides } from '@ionic/angular';
import { EventsParams } from 'swiper/angular';
import { ContentsquareCDVPlugin } from '@contentsquare/cordova-plugin-types';
import { Router } from '@angular/router';

declare const ContentsquarePlugin: ContentsquareCDVPlugin;

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides]);

@Component({
  selector: 'app-screen-slide',
  templateUrl: './screen-slide.page.html',
  styleUrls: ['./screen-slide.page.scss'],
})


// This class showcases how to implement Screenviews for sliding pages
export class ScreenSlidePage implements OnInit {
  private slides: any;

  slideNames = ['slide1-screen', 'slide2-screen', 'slide3-screen'];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  // We detect when the slide changes and sends the corresponding screen name
  onSlideChange() {
    console.log('Slide Changed');
    this.sendScreenName(this.slideNames[this.slides.activeIndex]);
  }

  // We set the reference of the swiper object 
  setSwiperInstance(swiper) {
    this.slides = swiper;
    // Send the screen name of the first swipe screen 
    this.sendScreenName(this.slideNames[this.slides.activeIndex]);
  }

  // We prefix the slide screen name with the router url
  sendScreenName(slideScreenName) {
    console.log('Send screen name: ', this.router.url + '/' + slideScreenName);
    ContentsquarePlugin.sendScreenName(this.router.url + '/' + slideScreenName, () => {
      // Success
    }, function (err) {
      console.log('Err', err);
    });
  }

}
