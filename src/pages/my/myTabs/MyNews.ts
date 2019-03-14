import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Constant } from '../../../service/Constant'
import { jiandinPage } from '../../quan/QuanTabs/jiandin';
import { AppService } from '../../../service/AppService';

@Component({

  templateUrl: 'MyNews.html',
  providers: [AppService]

})
export class MyNewsPage {
  avatar
  content
  insertDate
  userName
  data
  type
  collectionId
  Service
  token
  userId
  contentNews
  storage
  pushdata
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    storage: Storage,
    private appService: AppService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.Service = appService;
    this.storage = storage;

    storage.get('token').then((val) => {
       // Create the popup
      let loadingPopup = this.loadingCtrl.create({
      });
      // Show the popup
      loadingPopup.present();
      console.log('token', val);
      this.token = val;
      let url = 'sc/api/message/messageList?';
      let token = 'token=' + this.token;
      let URL = url + token;
      this.Service.post(URL).subscribe((data: any) => {
         setTimeout(() => {
        if (this.Service.nologin(data)) {//判断success和status的值
          console.log('我的消息', data);
          this.data = data.data;

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

  goBack() {
    this.navCtrl.pop();
  }
  //跳转鉴定页
  pushJiandinDetailed = (data: any): any => {
    this.pushdata = data;
    this.collectionId = this.pushdata.collectionId;
    this.userId = this.pushdata.userId;
    this.type = this.pushdata.type;

    console.log('4444', this.type)
    if (this.collectionId != 0) {
      this.navCtrl.push(jiandinPage, {
        'id': data.collectionId,

      });
    }
    if (this.collectionId === 0) {
      this.sixin()
    }

  }
  //下面是我的消息中的回复私信
  sixin() {
    let prompt = this.alertCtrl.create({
      title: '私信',
      inputs: [
        {
          name: 'title',
          value: this.content,

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
            console.log('sixin', res);
            let url = 'sc/api/message/sendMessage?';
            let token = 'token=' + this.token;
            let content = '&content=' + res.title;
            let receiver = '&receiver=' + this.userId;
            let URL = url + token + content + receiver
            this.Service.post(URL).subscribe((data: any) => {
              if (this.Service.nologin(data)) {//判断success和status的值
                console.log(data)
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

}
