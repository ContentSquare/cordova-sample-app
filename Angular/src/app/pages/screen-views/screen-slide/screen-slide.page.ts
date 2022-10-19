import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { IonicSlides } from '@ionic/angular';
import { EventsParams } from 'swiper/angular';
import { ContentsquareCDVPlugin } from '@contentsquare/cordova-plugin-types';
import { Router } from '@angular/router';
import { ContentsquareService } from 'src/app/services/contentsquare.service';


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

  constructor(private router: Router, private csService: ContentsquareService) { }

  ngOnInit() {
  }

  // We detect when the slide changes and send the corresponding screen name
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
    this.csService.sendScreenName(this.router.url + '/' + slideScreenName);
  }

}
