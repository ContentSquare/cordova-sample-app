import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  clearData() {
    localStorage.clear();
  }

  getUserConsent(): boolean {
    return localStorage.getItem('userConsent') === 'true';
  }

  acceptPolicy(){
    localStorage.setItem('userConsent', 'true');
  }

  denyPolicy(){
    localStorage.setItem('userConsent', 'false');
  }

  isFirstLaunch(){
    return localStorage.getItem('isFirstLaunch') !== 'false';
  }

  onFirstLaunch(){
    localStorage.setItem('isFirstLaunch', 'false');
  }

}
