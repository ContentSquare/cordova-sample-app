import { Component, OnInit } from '@angular/core';
import { ContentsquareCDVPlugin } from '@contentsquare/cordova-plugin-types';

declare const ContentsquarePlugin: ContentsquareCDVPlugin;

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})

// This class showcases how to use privacy-related APIs.
// You are responsible for creating the UI asking the user for his consent, and then calling the appropriate Contentsquare function.
export class PrivacyPage implements OnInit {

  constructor() { }

  ngOnInit() {
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
