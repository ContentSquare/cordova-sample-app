import { Component, OnInit } from '@angular/core';
import { ContentsquareCDVPlugin, DynamicVarItem } from '@contentsquare/cordova-plugin-types';

declare var ContentsquarePlugin: ContentsquareCDVPlugin;


@Component({
  selector: 'app-dynamic-variables',
  templateUrl: './dynamic-variables.page.html',
  styleUrls: ['./dynamic-variables.page.scss'],
})

// This class showcases how to use dynamic variables to gather additional data about the session
export class DynamicVariablesPage implements OnInit {

  dynVarWithString: DynamicVarItem = {
    dynVarKey: '',
    dynVarValue: ''
  };

  dynVarWithInt: DynamicVarItem = {
    dynVarKey: '',
    dynVarValue: null
  };

  errors = {
    dynVarWithStringKey: false,
    dynVarWithIntKey: false,
    dynVarWithStringValue: false,
    dynVarWithIntValue: false
  };

  constructor() { }

  ngOnInit() {
  }

  checkFieldsDynVarWithString() {
    this.errors.dynVarWithStringKey = this.dynVarWithString.dynVarKey === '';
    this.errors.dynVarWithStringValue = this.dynVarWithString.dynVarValue === '';
    let errorExists = false;
    for (const key in this.errors) {
      errorExists = errorExists || this.errors[key];
    }
    if (!errorExists) {
      this.sendDynVar(this.dynVarWithString);
    }

    // Reset the dynVarWithString model
    this.dynVarWithString = {
      dynVarKey: '',
      dynVarValue: ''
    };
  }

  checkFieldsDynVarWithInt() {
    this.errors.dynVarWithIntKey = this.dynVarWithInt.dynVarKey === '';
    this.errors.dynVarWithIntValue = !this.isNumeric(this.dynVarWithInt.dynVarValue);

    let errorExists = false;
    for (const key in this.errors) {
      errorExists = errorExists || this.errors[key];
    }
    if (!errorExists) {
      this.sendDynVar(this.dynVarWithInt);

      // Reset the dynVarWithInt model
      this.dynVarWithInt = {
        dynVarKey: '',
        dynVarValue: ''
      };
    }
  }

  sendDynVar(item: DynamicVarItem) {
    ContentsquarePlugin.sendDynamicVar(item,
      (res) => {
        console.log(res);
      }, (err) => {
        console.error(err);
      });
  }

  // Return if value is a positive number
  isNumeric(value) {
    return /^\d+$/.test(value);
  }

}
