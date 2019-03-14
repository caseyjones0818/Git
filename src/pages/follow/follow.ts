import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { userinfoPage } from  '../userinfo/userinfo';
import {AppService} from '../../service/AppService';
@Component({
  selector: 'page-follow',
  templateUrl: 'follow.html',
  providers  : [AppService]

})
export class followPage {
  data:any;
  token:any;
  followId:any;
  e:any
  URL
  userId
  Service
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private appService: AppService) {
    this.Service = appService;
    storage.ready().then(() => {
      // set a key/value
      storage.get('token').then((val) => {
        console.log('token', val);
        var token='token='+val;
        var url = 'sc/api/user/getFollowList?';
        this.URL =url+token
        this.Service.post(url+token).subscribe((data:any) => {
            if(this.Service.nologin(data)){//判断success和status的值
                  console.log(data)
                  this.data = data.data;
                  this.userId = data.data.userId;
                  console.log('userId',this.userId)
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
    this.token = navParams.get('token')

  }
  //返回上一页
  goBack() {
    this.navCtrl.pop();

  }
  //跳转用户信息页
  pushUserinfoPage=(userId:any):any =>{
    this.navCtrl.push(userinfoPage, {
      'userId':userId
    });
  }

  // unfollow(){
  //   let token ='token='+this.token;
  //   let followId = '&followId='+this.followId;
  //     console.log(followId);
  //     let params =token+followId
  //
  //   let url = 'sc/api/user/delAttention?';
  //   let URL =url+params
  //
  //   this.Service.post(URL).subscribe((data:any) => {
  //       if(this.Service.nologin(data)){//判断success和status的值
  //         console.log(data)
  //       }
  //       else {
  //         this.Service.alert('访问出错请重新登录')
  //       }
  //     },
  //     err => {
  //       console.log('报错',err);
  //     });
  // }

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
