import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {Storage} from '@ionic/storage';
import 'rxjs';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginInterfacePage } from '../pages/LoginInterface/LoginInterface';
import { JPushService } from 'ionic2-jpush'

@Component({
  templateUrl: 'app.html',
  providers  : [JPushService]

})
export class MyApp {
  rootPage
  // LoginInterfacePage: any = LoginInterfacePage
  storage_account
  storage_password
  storage_login
  constructor(platform: Platform, storage: Storage,
              private jPushPlugin: JPushService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      storage.get('account').then((val) => {
        console.log('account', val)
        this.storage_account = val;
        if(this.storage_account==val){
          this.rootPage = TabsPage;
        }
       if(this.storage_account==null){
         this.rootPage = LoginInterfacePage;

       }
      })
      storage.get('password').then((val) => {
        console.log('password', val)
        this.storage_password = val;
        if(this.storage_password==val){
          this.rootPage = TabsPage;
        }
        if(this.storage_password==null){
          this.rootPage = LoginInterfacePage;

        }
      });
      // //极光推送
      // // this.jPushPlugin.init();
      // this.jPushPlugin.init();
    });

  }
}
