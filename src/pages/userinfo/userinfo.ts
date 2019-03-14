import { Component } from '@angular/core';

import { NavController,NavParams,AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import { ActionSheetController } from 'ionic-angular';
import { userFollowerPage } from '../follower/userFollower';
import { userFollowPage } from '../follow/userFollow';
import { HisReleasePage } from '../userinfo/HisRelease';
import { HisCommentsPage } from '../userinfo/HisComments';
import {AppService} from '../../service/AppService';
import {Constant} from '../../service/Constant'



@Component({
  selector: 'page-my',
  templateUrl: 'userinfo.html',
    providers  : [AppService]

})
export class userinfoPage {
  pet: string = "fabu";
  userId:any;
  data:any;
  avatar:any;
  userName
  fansCount
  followCount
  vipLevel
  gold
  token
  temp:any;
  follow
  content
  AppService
  Service
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              storage: Storage,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              private appService: AppService,

) {
    this.Service = appService;
    storage.ready().then(() => {
      // set a key/value
      storage.get('token').then((val) => {
        console.log('token', val);
        // var token='token='+val;
        this.token = val
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let data = {};
        let url = Constant.APP_URL +'sc/api/user/getUserInfo?';
        let userId = 'userId='+this.userId;
        let params = userId+'&token='+val;
        let URL =url+params;
        console.log('URL',URL);
        this.http.post(URL, JSON.stringify(data))
          .map(res => res.json())
          .subscribe(data => {
            console.log(data)
            let postData =data.data;
            this.avatar = postData.avatar;
            this.userName = postData.userName;
            this.fansCount = postData.fansCount;
            this.followCount = postData.followCount;
            this.vipLevel = postData.vipLevel;
            this.gold = postData.gold;
            this.userId = postData.userId;
            //判断本账户是否关注
            this.follow = postData.follow;
            let follow = this.follow;
            if(follow == true){
             this.temp ='取消关注'
            }
            else {
              this.temp ='关注'
            }


          }, (err) => {
            console.log(err);
          });
      })
    });

  //前一页传来的参数
    this.userId = navParams.get('userId')
    console.log('userId',this.userId)
  }

  // //
  push= (userId:any): any =>{
    this.navCtrl.push(userFollowPage, {
      'userId':userId,
    });
    console.log('push',userId )
  }
//
  pushFans= (userId:any): any =>{
    this.navCtrl.push(userFollowerPage, {
      'userId':userId,
    });
    console.log('push',userId )
  }

  //跳用户藏品页
  pushHisRelease= (userId:any): any =>{
    this.navCtrl.push(HisReleasePage, {
      'userId':userId,
    });
    console.log('pushHisRelease',userId )
  }
  //跳用户评论页
  pushHisCommments= (userId:any): any =>{
    this.navCtrl.push(HisCommentsPage, {
      'userId':userId,
    });
    console.log('pushHisCommments',userId )
  }

  //行动表模块
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: this.temp,
          handler: () => {
            if(this.temp == '关注'){
                this.temp = '取消关注';
              //这里是关注执行代码
              let token ='token='+this.token;
              let followId = '&followId='+this.userId;
              console.log(followId);
              let params =token+followId
              let data = {};
              var url = Constant.APP_URL +'sc/api/user/addAttention?';
              this.http.post(url+params, JSON.stringify(data))
                .map(res => res.json())
                .subscribe(data => {
                  console.log(data)
                  console.log('关注成功');

                }, (err) => {
                  console.log(err);
                });
            }
            else {
              //这里是取消关注执行代码
              this.temp = '关注';
              let token ='token='+this.token;
              let followId = '&followId='+this.userId;
              console.log(followId);
              let params =token+followId
              let data = {};
              let url = Constant.APP_URL +'sc/api/user/delAttention?';
              this.http.post(url+params, JSON.stringify(data))
                .map(res => res.json())
                .subscribe(data => {
                  console.log(data)
                  console.log('取消关注成功')

                }, (err) => {
                  console.log(err);
                });
            }

          }
        },

        {
          text: '发信息',
          handler: () => {
            console.log('发信息 clicked');
            this.sixin()
          }
        },
        // {
        //   // text: '拉黑',
        //   // role: 'destructive',
        //   // handler: () => {
        //   //   console.log('拉黑 clicked');
        //   // }
        // },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('取消 clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

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
            console.log('sixin',res);
            let url = 'sc/api/message/sendMessage?';
            let token ='token='+this.token;
            let content ='&content='+this.content;
            let receiver = '&receiver='+this.userId;
            let URL =url+token+content+receiver
          this.Service.post(URL).subscribe((data:any) => {
            if(this.Service.nologin(data)){//判断success和status的值
            console.log(data)
                }
            else {
              this.Service.alert('访问出错请重新登录')
            }
          },
          err => {
            console.log('报错',err);
          });
              
             

          }
        }
      ]
    });
    prompt.present();
  }
}

