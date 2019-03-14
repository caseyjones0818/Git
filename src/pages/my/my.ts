import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

import { UploadService } from "../../service/upload.service";
import { ImageParam } from "../contact/image-param";
import { CameraOptions, Camera, ImagePickerOptions, ImagePicker } from "ionic-native/dist/es5/index";
import { ActionSheetController } from 'ionic-angular';

import { RechargePage } from '../my/myTabs/Recharge';
import { EarnGoldPage } from '../my/myTabs/EarnGold';
import { GoldMallPage } from '../my/myTabs/GoldMall';

import { MyNewsPage } from '../my/myTabs/MyNews';
import { PublishingCollectionsPage } from '../my/myTabs/PublishingCollections';
import { PostCommentPage } from '../my/myTabs/PostComment';
import { FavoritePage } from '../my/myTabs/Favorite';
import { InviteFriendsPage } from '../my/myTabs/InviteFriends';
import { followerPage } from '../follower/follower';
import { followPage } from '../follow/follow';
import { sitePage } from '../my/site/site';
import { LoginInterfacePage } from '../LoginInterface/LoginInterface';
import { jiandinManagePage } from '../jiandinManage/jiandinManage';

import { AppService } from '../../service/AppService';



@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
  providers: [AppService]

})
export class MyPage {
  imagePaths: Array<string> = [];
famous
  push1Page: any = EarnGoldPage;
  push2Page: any = MyNewsPage;
  push3Page: any = PublishingCollectionsPage;
  push4Page: any = PostCommentPage;
  push5Page: any = FavoritePage;
  push8Page: any = GoldMallPage;
  push9Page: any = InviteFriendsPage;
  push10Page: any = RechargePage;
  push11Page: any = jiandinManagePage;
  followerPage: any = followerPage;
  sitePage: any = sitePage;
  id: any;
  token: any;
  avatar: any;
  userName: any;
  signature: any;
  fansCount: any;
  followCount: any;
  gold: any;
  vipLevel: any;
  UpdatedName: string;
  UpdatedSignature: string;
  Service
  shopUrl
  Browser
  imageUrl
  disabled
  myAvatar
  storage
  imageUrlAvatar
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    private uploadService: UploadService,
    private actionsheetCtrl: ActionSheetController,
    public navParams: NavParams,
    private http: Http,
    storage: Storage,
    private appService: AppService,
    private themeableBrowser: ThemeableBrowser,
    public loadingCtrl: LoadingController
  ) {
    this.Service = appService;
    this.storage = storage
    storage.ready().then(() => {
      // set a key/value

    });

    this.Browser = themeableBrowser
    storage.get('token').then((val) => {
      // Create the popup
      let loadingPopup = this.loadingCtrl.create({
      });
      // Show the popup
      loadingPopup.present();
      console.log('token', val);
      var token = 'token=' + val;
      let url = 'sc/api/shop/shopIndex?';
      let URL = url + token
      this.Service.post(URL).subscribe((data: any) => {
        setTimeout(() => {
          if (this.Service.nologin(data)) {//判断success和status的值
            console.log(data);
            this.famous = data.data.famous;
            this.shopUrl = data.data.shopUrl
            console.log(this.shopUrl);
          }
          else {
            this.Service.alert('访问出错请重新登录')
          }
          loadingPopup.dismiss();
        }, 1000);
      },
        err => {
          console.log('报错', err);
        });
    });

  }


  //跳转粉丝页
  push = (token: any): any => {
    this.navCtrl.push(followPage, {
      'token': token,
    });
    console.log('push', token)
  }

  editNickname() {
    let prompt = this.alertCtrl.create({
      title: '编辑昵称',
      inputs: [
        {
          name: 'title',
          value: this.UpdatedName,

        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: res => {
            console.log('editNickname', res);
            this.UpdatedName = res.title;
            var url = 'sc/api/user/updateUserInfo?';
            let token = 'token=' + this.token
            let user_name = '&user_name=' + this.UpdatedName;
            var URL = url + token + user_name
            this.Service.post(URL).subscribe((data: any) => {
              if (this.Service.nologin(data)) {//判断success和status的值
                console.log(data)
                this.userName = this.UpdatedName;
              }
              else {
                this.Service.alert('访问出错请重新登录')
              }
            },
              err => {
                console.log('报错', err);
              });

          }
        }
      ]
    });
    prompt.present();

  }
  introductionToEditing() {
    let prompt = this.alertCtrl.create({
      title: '编辑简介',
      inputs: [
        {
          name: 'title',
          value: this.UpdatedSignature
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: res => {
            console.log('introductionToEditing', res);
            this.UpdatedSignature = res.title;

            var url = 'sc/api/user/updateUserInfo?';
            let token = 'token=' + this.token
            let signature = '&signature=' + this.UpdatedSignature;
            var URL = url + token + signature
            console.log('url', URL)
            this.Service.post(URL).subscribe((data: any) => {
              if (this.Service.nologin(data)) {//判断success和status的值
                console.log(data)
                this.signature = this.UpdatedSignature;
              }
              else {
                this.Service.alert('访问出错请重新登录')
              }
            },
              err => {
                console.log('报错', err);
              });
          }
        }
      ]

    });
    prompt.present();
  }


  



  pickImage(): void {
    let options: ImagePickerOptions = {
      maximumImagesCount: 1,
      quality: 3
    };
    ImagePicker.getPictures(options).then((results) => {
      this.imagePaths = this.imagePaths.concat(results);
      this.upload();


    }, (error) => {
      console.log(error);
    });
  }

  //头像上传
  upload() {
    // 这里设置为你的后台上传图片所需的参数
    var uploadParams = new ImageParam();
    uploadParams.ftype = 'image';
    uploadParams.utype = 'goods';
    // 注入UploadService
    this.uploadService.uploadImages(uploadParams, this.imagePaths).subscribe((imgsdata) => {
      this.imageUrl = imgsdata;
      this.imageUrlAvatar = 'http://7xqlp0.com2.z0.glb.qiniucdn.com/' + this.imageUrl;
      this.myAvatar = this.imageUrlAvatar;
      // 获得所有上传图片返回的uri之后，再做你想做的事情
      // 这里拿到的后台返回的imageUrls数组与之前图片的本地url的filePaths数组的顺序是一致的
      // 也就是说不管上传图片谁先请求成功，ForkJoinObservable内部会按照之前信号数组添加的顺序将后台返回的数据排好序放在imageUrls数组中,
      // 这点还是不错的
      let url = 'sc/api/user/updateAvatar?';
      let token = 'token=' + this.token;
      let avatar = '&avatar=' + this.imageUrl;
      let URL = url + token + avatar;
      this.Service.post(URL).subscribe((data: any) => {
        if (this.Service.nologin(data)) {//判断success和status的值
          this.imagePaths.splice(0, this.imagePaths.length);
          this.Service.alert('上传成功！')

        }
        else {
          this.Service.alert('访问出错请重新登录')
        }
      },
        err => {
          console.log('报错', err);
        });

    });

  }
  ionViewDidEnter() {
    this.storage.get('token').then((val) => {
      console.log('token', val);
      var token = 'token=' + val;
      this.token = 'token=' + val
      let url = 'sc/api/my/meIndex?';
      let URL = url + token
      this.Service.post(URL).subscribe((data: any) => {
        if (this.Service.nologin(data)) {//判断success和status的值
          console.log(data)
          this.avatar = data.data.avatar;
          this.myAvatar = this.avatar + '-thumbnail25'
          this.userName = data.data.userName;
          this.signature = data.data.signature;
          this.fansCount = data.data.fansCount;
          this.followCount = data.data.followCount;
          this.gold = data.data.gold;
          this.vipLevel = data.data.vipLevel;
          this.token = data.data.token;
          console.log('hhh', this.avatar)
        }
        else {
          this.Service.alert('访问出错请重新登录')
        }
      },
        err => {
          console.log('报错', err);
        });

    })
  }
}
