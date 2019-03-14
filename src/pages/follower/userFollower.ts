import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppService} from '../../service/AppService';


@Component({
  selector: 'page-userFollower',
  templateUrl: 'userFollower.html',
  providers  : [AppService]

})

export class userFollowerPage {
  data:any;
  token:any;
  followId:any;
  e:any
  URL
  userId
  Service
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              private storage: Storage,
              private appService: AppService) {
    this.Service = appService;
    storage.ready().then(() => {
      // 得到本地存储值
      storage.get('token').then((val) => {
        console.log('token', val);
        var token='token='+val;
        //post请求格式
        let url = 'sc/api/user/getUserFansList?';
        let userId = 'userId='+this.userId
        let URL =url+token
        this.URL =url+userId  //传到下拉刷新中
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
    this.userId = navParams.get('userId')

  }
  //返回上一页
  goBack() {
    this.navCtrl.pop();
  }
  //下拉刷新
  doRefresh(refresher) {
    setTimeout(() => {
      this.Service.post(this.URL).subscribe((data:any) => {
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

      refresher.complete();
    }, 2000);
  }

}
