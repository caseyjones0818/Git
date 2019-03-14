import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { userinfoPage } from  '../userinfo/userinfo';
import {AppService} from '../../service/AppService';


@Component({
  selector: 'page-follower',
  templateUrl: 'follower.html',
  providers  : [AppService]

})
export class followerPage {
  data:any;
  URL
  followId
  userId
  Service
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              storage: Storage,
              private appService: AppService) {
    this.Service = appService;

    storage.ready().then(() => {
      // set a key/value
      storage.get('token').then((val) => {
        console.log('token', val);
        var token='token='+val;
        var url = 'sc/api/user/getFansList?';
        let URL = url+token
        this.URL =url+token
        this.Service.post(URL).subscribe((data:any) => {
            if(this.Service.nologin(data)){//判断success和status的值
              console.log(data)
              this.data = data.data;
              this.userId = data.data.userId;
              console.log(this.data)
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
  }
  goBack() {
    this.navCtrl.pop();
  }
  //跳转用户信息页
  pushUserinfoPage=(userId:any):any =>{
    this.navCtrl.push(userinfoPage, {
      'userId':userId
    });
  }

  doRefresh(refresher) {
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
