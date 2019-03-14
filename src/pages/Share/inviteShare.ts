import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { NavController, ViewController, NavParams, LoadingController } from 'ionic-angular';
import { AppService } from '../../service/AppService';
import { Constant } from '../../service/Constant'

@Component({
  selector: 'page-Share',
  templateUrl: 'inviteShare.html',
  providers: [AppService]
})
export class inviteSharePage {
  comment
  Service
  token
  collection_id
  shareid
  shareData
  id
  introduction
  img
  title
  inviteCode
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private appService: AppService,
    params: NavParams,
    storage: Storage,
    public loadingCtrl: LoadingController
  ) {
    this.Service = appService;
    this.shareData = params.get('shareData')
    console.log('分享数据', this.shareData)
    // this.id = this.shareData.id;
    this.introduction = this.shareData.shareBody;
    this.img = this.shareData.shareImg;
    this.title = this.shareData.shareTitle;
    // console.log(this.img);
    // this.shareid = 'id=' + this.id;
    this.inviteCode ='inviteCode=' +  this.shareData.inviteCode;
    console.log(this.inviteCode);
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



  shareTimeline() {
    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
    });
    // Show the popup
    loadingPopup.present();
    setTimeout(() => {
      Wechat.share({
        message: {
          title: this.title,
          description: this.introduction,
          thumb: this.img,
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: Constant.APP_URL + "sc/api/html/shareInvite?" + this.inviteCode
          }
        },
        scene: Wechat.Scene.TIMELINE   // share to Timeline
      }, function () {
        // alert("Success");
      }, function (reason) {
        // alert("Failed: " + reason);
      });
      loadingPopup.dismiss();
    }, 1000);
  }

  shareWechat() {
    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
    });
    // Show the popup
    loadingPopup.present();
    setTimeout(() => {
      Wechat.share({
        message: {
          title: this.title,
          description: this.introduction,
          thumb: this.img,
          media: {
            type: Wechat.Type.WEBPAGE,
            webpageUrl: Constant.APP_URL + "sc/api/html/shareInvite?" + this.inviteCode,
          }
        },
        scene: Wechat.Scene.SESSION   // share to Timeline
      }, function () {
        // alert("Success");
      }, function (reason) {
        // alert("Failed: " + reason);
      });
      loadingPopup.dismiss();
    }, 1000);
  }



  shareQQ() {
    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
    });
    // Show the popup
    loadingPopup.present();
    setTimeout(() => {
      var args: any = {};
      args.client = QQSDK.ClientType.QQ;//QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
      args.scene = QQSDK.Scene.QQ;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
      args.url = Constant.APP_URL + "sc/api/html/shareInvite?" + this.inviteCode;
      args.title = this.title;
      args.description = this.introduction;
      args.image = this.img;
      QQSDK.shareNews(function () {
        // alert('shareNews success');
      }, function (failReason) {
        // alert(failReason);
      }, args);
      loadingPopup.dismiss();
    }, 1000);
  }

  shareQQZone() {
    // Create the popup
    let loadingPopup = this.loadingCtrl.create({
    });
    // Show the popup
    loadingPopup.present();
    setTimeout(() => {
      var args: any = {};
      args.client = QQSDK.ClientType.QQ;//QQSDK.ClientType.QQ,QQSDK.ClientType.TIM;
      args.scene = QQSDK.Scene.QQZone;//QQSDK.Scene.QQZone,QQSDK.Scene.Favorite
      args.url = Constant.APP_URL + "sc/api/html/shareInvite?" + this.inviteCode;
      args.title = this.title;
      args.description = this.introduction;
      args.image = this.img;
      QQSDK.shareNews(function () {

        // alert('shareNews success');

      }, function (failReason) {
        // alert(failReason);
      }, args);
      loadingPopup.dismiss();
    }, 1000);
  }



}
