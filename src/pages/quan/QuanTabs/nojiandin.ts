import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ViewController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { QuanImgPage } from '../QuanImg';
import { userinfoPage } from '../../userinfo/userinfo';
import { AppService } from '../../../service/AppService';

@Component({
  selector: 'page-quan',
  templateUrl: 'nojiandin.html',
  providers: [AppService]

})
export class nojiandinPage {
  userinfoPage: any = userinfoPage;
  testRadioOpen: boolean;
  testRadioResult;
  DetailsImport: any;
  urlDetails: any;
  userName: any;
  avatar: any;
  imgList: any;
  introduction: any;
  famousName: any;
  insertDate: any;
  updateDate: any;
  title: any;
  categoryName: any;
  id: any;
  userId
  identifyResult
  token
  Service
  params
  favorite
  shoucangID
  rewardConfigList
  collection_id
  famousId
  data
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alerCtrl: AlertController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private http: Http,
    storage: Storage,
    private appService: AppService,
    public loadingCtrl: LoadingController

  ) {
    this.Service = appService;


    //鉴定列表ID 传值
    this.data = navParams.get('data');
    console.log('jian', this.data);
    this.title = this.data.title;
    this.categoryName = this.data.categoryName;
    this.avatar = this.data.avatar;
    this.userName = this.data.userName;
    this.imgList = this.data.imgList;
    this.insertDate = this.data.insertDate;
    this.introduction = this.data.introduction;
    this.urlDetails = this.data;
    this.userId = this.data.userId;

  }
  //图片查看器
  push = (img: any, index: number): any => {
    this.navCtrl.push(QuanImgPage, {
      'img': img,
      'index': index,

    });
    console.log('详情点击图片', img)
  }
  //跳转用户信息页
  pushUserinfoPage = (userId: any): any => {
    this.navCtrl.push(userinfoPage, {
      'userId': userId
    });
  }

}




