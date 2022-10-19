import { Injectable } from '@angular/core';
import { ContentsquareCDVPlugin } from '@contentsquare/cordova-plugin-types';

declare const ContentsquarePlugin: ContentsquareCDVPlugin;

@Injectable({
  providedIn: 'root'
})
export class ContentsquareService {

  // We map the url of the screen with the screen name
  private mapScreenURL = {
    "/home": "Menu",
    "/privacy": "Privacy",
    "/screen-views": "Screen Views Menu",
    "/transactions": "Transactions",
    "/dynamic-variables": "Dynamic Vars",
    "/screen-views/screen-default": "Screen Default",
    "/screen-views/screen-modal": "Screen Modal",
    "/screen-views/screen-modal/my-modal-screen": "My Modal Screen",
    "/screen-views/screen-slide/slide1-screen": "Screen Slide 1",
    "/screen-views/screen-slide/slide2-screen": "Screen Slide 2",
    "/screen-views/screen-slide/slide3-screen": "Screen Slide 3",
    "/screen-views/screen-tab-container/first-tab": "Tab 1",
    "/screen-views/screen-tab-container/second-tab": "Tab 2",
    "/screen-views/screen-tab-container/third-tab": "Tab 3",

  };

  // Some URLs could be excluded. For example, the "screen-slide" is only a container. We only need to send the name of the slide screens
  private excludedURL = [
    "/screen-views/screen-slide"
  ]

  constructor() { }

  private getScreenName(url: string) {
    return this.mapScreenURL[url] || "undefined";
  }

  // Send the screen name to the SDK
  sendScreenName(url: string) {
    if (!this.excludedURL.includes(url)) {
      const screenName = this.getScreenName(url);
      console.log('Url: ' + url + ' -> Send screen name: ' + screenName);
      ContentsquarePlugin.sendScreenName(screenName, () => {
        // Success
      }, (err) => {
        console.log('Err', err);
      });
    } else {
      console.log('Url: ' + url + ' -> Excluded URL ');
    }
  }

}
