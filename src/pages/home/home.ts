import { Component, ViewChild, } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { SwiperModule } from 'angular2-useful-swiper'; //or for angular-cli the path will be ../../node_modules/angular2-useful-swiper
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

import { RechargePage } from '../my/myTabs/Recharge';
import { QuanPage } from '../quan/quan';
import { ContactPage } from '../contact/contact';
import { jiandinPage } from '../quan/QuanTabs/jiandin';
import { EarnGoldPage } from '../my/myTabs/EarnGold';
import { GoldMallPage } from '../my/myTabs/GoldMall';

import { Constant } from '../../service/Constant'
import { LoginInterfacePage } from '../LoginInterface/LoginInterface';
import { RegisterAccountPage } from '../RegisterAccount/RegisterAccount';
import { AppService } from '../../service/AppService';
import { VIPPage } from '../VIP/VIP';


import { NavController, ToastController, Slides, NavParams, LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AppService]

})

export class HomePage {
  pet: string = "puppies";
  EarnGoldPage: any = EarnGoldPage;
  RechargePage: any = RechargePage;
  QuanPage: any = QuanPage;
  ContactPage: any = ContactPage;
  jiandinPage: any = jiandinPage;
  RegisterAccountPage = RegisterAccountPage;
  appraisalNewLists: any;
  banners: any;
  success: any;
  index
  id
  sign
  point
  storage
  notoken
  promoSlider
  Service
  slider
  homeOptions
  bannerPath
  shopUrl
  bannerApiUrl
  imgList
  iconImg
  @ViewChild('Slides') mySlide: Slides;
  constructor(public toastCtrl: ToastController,
    public navCtrl: NavController,
    private http: Http, storage: Storage,
    private navParams: NavParams,
    swiper: SwiperModule,
    private appService: AppService,
    public loadingCtrl: LoadingController,
    private themeableBrowser: ThemeableBrowser,
  ) {
    this.Service = appService;
    this.storage = storage;
   storage.get('notoken').then((val) => {
        console.log('notoken4444',val);
   });

    storage.get('token2').then((val) => {
      console.log('首页的token', val)
      // Create the popup
      let loadingPopup = this.loadingCtrl.create({
      });
      // Show the popup
      loadingPopup.present();
      let token = '&token=' + val;
      let url = 'sc/api/home/homeIndex?pageSize=6';
      let URL = url + token
      this.Service.get(URL).subscribe((data: any) => {
        // I've added this timeout just to show the loading popup more time
        setTimeout(() => {
          this.appraisalNewLists = data.data.appraisalNewList;
          if (data.success == true) {
            this.appraisalNewLists = data.data.appraisalNewList;
            console.log('this.appraisalNewLists',this.appraisalNewLists)
            this.iconImg = this.appraisalNewLists.iconImg;
            console.log('this.iconImg',this.iconImg); 
            this.id = data.data.appraisalNewList.id;
            this.sign = data.data.sign.sign;
            console.log('this.sign', this.sign)
            this.point = data.data.sign.point
            this.banners = data.data.bannerList;
            // this.bannerPath = data.data.bannerPath
            console.log('首页数据', data);
            console.log('bannerPath ', this.bannerPath);

          }
          else {
            console.log('接口访问出错')
          }
          loadingPopup.dismiss();
        }, 500);
      },
        err => {
          console.log('报错');
        });

    });

    // storage.get('notoken').then((val) => {
    //   console.log('notoken', val)
    //   this.notoken=val;
    //
    // })

  }
  //签到数据UI
  qiandao() {
    this.storage.get('token').then((val) => {
      console.log('token', val);
      var token = 'token=' + val;
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let data = {};
      var url = Constant.APP_URL + 'sc/api/user/addSignature?';
      this.http.post(url + token, JSON.stringify(data))
        .map(res => res.json())
        .subscribe(data => {
          console.log('签到', data);

          var url = Constant.APP_URL + 'sc/api/home/homeIndex?';
          this.http.get(url + token).map(res => res.json()).subscribe(data => {
            if (data.success == true) {
              this.appraisalNewLists = data.data.appraisalNewList;
              this.id = data.data.appraisalNewList.id;
              this.sign = data.data.sign.sign;
              this.point = data.data.sign.point
              this.banners = data.data.bannerList;
              console.log('首页数据', data);
              console.log('this.sign ', this.sign);

            }
            else {
              console.log('接口访问出错')
            }
          },
            err => {
              console.log('报错');
            });

        }, (err) => {
          console.log(err);
        });
    })

  }
  showToast(position: string) {
    let toast = this.toastCtrl.create({
      message: '今日已签到，请明日再来！',
      duration: 1000,
      position: position
    });

    toast.present(toast);
  }


  pushJiandinDetailed = (data: any): any => {
    this.navCtrl.push(jiandinPage, {
      'id': data.id,
    });
  }
  //banner跳转
  push = (data: any): any => {
    console.log(data);
    let bannerApi = data.bannerApi;
    let bannerApiUrl = data.bannerApiUrl;
    console.log(bannerApi);

    //跳转商城
    if (bannerApi === 'shop') {
      this.storage.get('token').then((val) => {
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
      //启动原生浏览器
      let browser = this.themeableBrowser.create(this.shopUrl, '_blank', this.options);
    }

    //跳转赚金币
    if (bannerApi === 'seeTask') {
      this.navCtrl.push(EarnGoldPage, {
      });
    }
    //跳转VIP
    if (bannerApi === 'vip') {
      this.navCtrl.push(VIPPage, {
      });
    }
    //跳转热门商品
    if (bannerApi === "heat_shop") {
      this.storage.get('token').then((val) => {
        // Create the popup
        let loadingPopup = this.loadingCtrl.create({
        });
        // Show the popup
        loadingPopup.present();
        console.log('token', val);
        var token = 'token=' + val;
        let url = 'sc/api/shop/consumeDbRedirect?';
        let dbredirect = '&dbredirect=' + bannerApiUrl;
        let URL = url + token + dbredirect;
        this.Service.post(URL).subscribe((data: any) => {
          setTimeout(() => {
            if (this.Service.nologin(data)) {//判断success和status的值
              console.log('热门商品', data);
              this.shopUrl = data.data.shopUrl;
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
      //启动原生浏览器
      let browser = this.themeableBrowser.create(this.shopUrl, '_blank', this.options);

    }

  }
  //原生浏览器配置
  private options = {
    statusbar: {
      color: '#d33a31'
    },
    toolbar: {
      height: 44,
      color: '#d33a31'
    },
    title: {
      color: '#003264ff',
      showPageTitle: true
    },
    backButton: {
      wwwImage: 'assets/img/back1.png',
      wwwImagePressed: 'assets/img/back1.png',
      wwwImageDensity: 2,
      align: 'left',
      event: 'backPressed'
    },
    forwardButton: {
      image: 'forward',
      imagePressed: 'forward_pressed',
      align: 'left',
      event: 'forwardPressed'
    },
    closeButton: {
      image: 'close',
      imagePressed: 'close_pressed',
      align: 'left',
      event: 'closePressed'
    },
    customButtons: [
      {
        image: 'share',
        imagePressed: 'share_pressed',
        align: 'right',
        event: 'sharePressed'
      }
    ],
    menu: {
      image: 'menu',
      imagePressed: 'menu_pressed',
      title: 'Test',
      cancel: 'Cancel',
      align: 'right',
      items: [
        {
          event: 'helloPressed',
          label: 'Hello World!'
        },
        {
          event: 'testPressed',
          label: 'Test!'
        }
      ]
    },
    backButtonCanClose: true
  };


}


