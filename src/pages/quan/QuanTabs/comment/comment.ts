import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController, ViewController, NavParams, LoadingController } from 'ionic-angular';
import { AppService } from '../../../../service/AppService';

@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
  providers: [AppService]
})
export class commentPage {
  comment
  Service
  token
  collection_id
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private appService: AppService,
    params: NavParams,
    storage: Storage,
    public loadingCtrl: LoadingController

  ) {
    this.Service = appService
    this.collection_id = params.get('collectionId')
    storage.get('token').then((val) => {
      this.token = val;
      console.log(this.token)
    })

  }
  modaleBack() {
    this.viewCtrl.dismiss();
  }
  goBack() {
    this.navCtrl.pop();
  }
  fa() {
    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
    });
    // Show the popup
    loadingPopup.present();
    let url = 'sc/api/shou/addComment?';
    let token = 'token=' + this.token;
    let collection_id = '&collection_id=' + this.collection_id;
    let comment = '&comment_content=' + this.comment;
    let URL = url + token + collection_id + comment;
    this.Service.post(URL).subscribe((data: any) => {
      setTimeout(() => {
      if (this.Service.nologin(data)) {//判断success和status的值
        this.goBack();
      }
      else {
        this.Service.alert('访问出错请重新登录')
      }
    },
      err => {
        console.log('报错', err);
      });
       loadingPopup.dismiss();
    }, 1000);
  }
}
