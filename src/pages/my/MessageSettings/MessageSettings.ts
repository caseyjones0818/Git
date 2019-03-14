import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'MessageSettings.html'
})
export class MessageSettingsPage {

  constructor(public navCtrl: NavController) {

  }
  goBack() {
    this.navCtrl.pop();
  }

}
