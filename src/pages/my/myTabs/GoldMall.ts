import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { NavController } from 'ionic-angular';
import { AppService } from '../../../service/AppService';

@Component({

  templateUrl: 'GoldMall.html',
  providers: [AppService]

})
export class GoldMallPage {
  Service
  shopUrl
  Browser
  constructor(public navCtrl: NavController,
    private appService: AppService,
    private storage: Storage,
    private themeableBrowser: ThemeableBrowser) {
    this.Service = appService;
    this.Browser = themeableBrowser
    storage.get('token').then((val) => {
      console.log('token', val);
      var token = 'token=' + val;
      let url = 'sc/api/shop/shopIndex?';
      let URL = url + token
      this.Service.post(URL).subscribe((data: any) => {
        if (this.Service.nologin(data)) {//判断success和status的值
          console.log(data);
          this.shopUrl = data.data.shopUrl;
          console.log(this.shopUrl);
        }
        else {
          this.Service.alert('访问出错请重新登录')
        }
      },
        err => {
          console.log('报错', err);
        });
    });

    let browser = this.themeableBrowser.create(this.shopUrl, '_blank', this.options);

  }



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





  //browser.show();
  //console.log(browser.show());
  /*this.platform.ready().then(() => {

   });*/





  goBack() {
    this.navCtrl.pop();
  }

}
