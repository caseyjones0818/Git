import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {AppService} from '../../service/AppService';

@Component({
  selector: 'page-userFollow',
  templateUrl: 'userFollow.html',
  providers  : [AppService]

})

export class userFollowPage {
  data:any;
  token:any;
  followId:any;
  e:any
  URL
  userId
  Service
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private appService: AppService,
              private storage: Storage,) {
    this.Service = appService;
    storage.ready().then(() => {
      storage.get('token').then((val) => {
        console.log('token', val);
        var token='token='+val;

        var url = 'sc/api/user/getUserFollowList?';
        var userId = 'userId='+this.userId
        this.URL =url+userId       //这个为了传到下面的doRefresh（）里
        let URL = url+userId
        this.Service.post(URL).subscribe((data:any) => {
            if(this.Service.nologin(data)){//判断success和status的值
              console.log(data)
              this.data = data.data;
              let e =   this.data;
              for(let i = 0; i < e.length; i++){
                this.followId = e[i].userId
              }
            }
            else {
              this.Service.alert('访问出错请重新登录')
            }
          },
          err => {
            console.log('报错',err);
          });


      })
    });
    // this.storageda = storage.get('token')
    this.userId = navParams.get('userId')

  }
  //返回上一页
  goBack() {
    this.navCtrl.pop();
  }
  //下拉刷新
  doRefresh(refresher) {
    console.log('222',this.URL)
    setTimeout(() => {
      this.Service.post(this.URL).subscribe((data:any) => {
          if(this.Service.nologin(data)){//判断success和status的值
            console.log(data)
            this.data = data.data;
            let e =   this.data;
            for(let i = 0; i < e.length; i++){
              this.followId = e[i].userId
              // console.log('userId',this.followId)
            }
          }
          else {
            this.Service.alert('访问出错请重新登录')
          }
        },
        err => {
          console.log('报错',err);
        });


         refresher.complete();
    }, 2000);
  }

}
