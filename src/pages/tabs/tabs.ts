import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController, NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { QuanPage } from '../quan/quan';
import { ContactPage } from '../contact/contact';
import { VIPPage } from '../VIP/VIP';
import { MyPage } from '../my/my';
import { LoginInterfacePage } from '../LoginInterface/LoginInterface';
import { RegisterAccountPage } from '../RegisterAccount/RegisterAccount';



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  token;
  tab1Root: any = HomePage;
  tab2Root: any = QuanPage;
  tab3Root: any;
  tab4Root: any = VIPPage;
  tab5Root: any;
  storage;
  notoken
  constructor(public navCtrl: NavController, storage: Storage, public alertCtrl: AlertController, private navParams: NavParams) {
    //变成游客状态时的前端逻辑
    this.storage = storage;
    //第一次登入使用navParams，从logininterface.ts获得token。
    let token = navParams.get('token');
    console.log('tab的token', token);
    if (token != null) {
      this.tab5Root = MyPage;
      this.tab3Root = ContactPage;
      this.storage.set('token2', token);

    }
    console.log('this.tab5Root', this.tab5Root)
    // if(this.tab5Root===undefined){
    //   this.alert('现在处于游客状态！')
    // }
    //第2次刷新登入使用storage来获得token
    storage.get('token').then((val) => {
      console.log('token', val)
      this.token = val;
      if (this.token != null) {
        this.tab5Root = MyPage;
        this.tab3Root = ContactPage;
      }
    })
    //存储notoken的值，在首页获得后写入'去注册'的ngIf
    this.notoken = navParams.get('notoken');
    console.log('this.notoken', this.notoken);
    if (this.notoken === "notoken") {
      this.tab5Root = RegisterAccountPage;
      this.tab3Root = RegisterAccountPage;

    }

    // this.storage.set('notoken', this.notoken)


  }
  alert(sub) {
    let alert = this.alertCtrl.create({
      title: '提示!',
      subTitle: sub,
      buttons: ['好的']
    });
    alert.present();
  }
}
