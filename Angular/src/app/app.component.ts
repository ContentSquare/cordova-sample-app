import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ContentsquareCDVPlugin } from '@contentsquare/cordova-plugin-types';

declare const window: any;
declare const ContentsquarePlugin: ContentsquareCDVPlugin;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private platform: Platform) {
    this.platform.ready().then((readySource) => {
      console.log('Platform ready from', readySource);

      // Handle incoming urls to monitor CS in-app activation
      window.handleOpenURL = (url)=>{
        console.log('received url: ' + url);

        ContentsquarePlugin.handleURL(url,() => {
          console.log('Success');
        }, (message) => {
          console.log(message);
        });
      };
    });
  }
}
