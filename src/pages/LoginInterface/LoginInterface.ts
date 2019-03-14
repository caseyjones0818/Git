import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {TabsPage} from '../tabs/tabs';
import {RegisterAccountPage} from '../RegisterAccount/RegisterAccount';
import {forgetPasswordPage} from '../LoginInterface/forgetPassword';
import { JPushService } from 'ionic2-jpush/dist';

import {md5} from '../../service/md5';
import {Constant} from '../../service/Constant'
import {AppService} from '../../service/AppService' //模块服务引入1


@Component({
  selector: 'page-LoginInterface',
  templateUrl: 'LoginInterface.html',
  providers  : [JPushService,AppService] //模块服务引入2
})
export class LoginInterfacePage {
  // rootPage = TabsPage;
  password: any;
  token: any;
  RegisterAccountPage = RegisterAccountPage;
  forgetPasswordPage = forgetPasswordPage;
  phone
  account
  login_data
  storage
  errMsg
  success
  storage_account
  storage_password
  data
  notoken
  jPush
  Service
  abc
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              storage: Storage,
              private jPushPlugin: JPushService,
              private appService: AppService ) {//模块服务引入3
                this.storage = storage;
                this.jPush = jPushPlugin;
                this.Service = appService; //模块服务引入4
                  //  this.abc ='123';
                  //  console.log(this.abc)

                //  storage.get('account').then((val) => {
                //    this.abc =val;
                //    console.log('this.abc',val)
                //  });
  }
  go() {
    let e = this.password && this.account;
    //判断账号密码是否为空
    if (e != null && e != '') {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('Access-Control-Allow-Origin','http://localhost');
      let data = {};
      let md5_password = md5(this.password);
      var url = Constant.APP_URL + 'sc/api/login/login?';
      let account = 'account=' + this.account;
      let password = '&password=' + md5_password;
      let login_URL = url + account + password;
      this.http.post(login_URL, JSON.stringify(data))
        .map(res => res.json())
        .subscribe(data => {
          console.log(data)
          this.login_data = data.data;
          if (this.login_data == null) {
            this.Service.alert('密码错误！')//模块服务引入5
          }
          else {
            this.token = data.data.token;
            this.phone = data.data.phone;
            this.errMsg = data.data.errMsg;
            
            this.storage.set('account', this.account);
            this.storage.set('password', this.password);
            this.storage.set('token', this.token);
            console.log('登入保存token',this.token);
            this.storage.set('phone', this.phone);
            this.storage.set('login_data', this.login_data);
            //跳转首页
            this.navCtrl.push(TabsPage, {
               token: this.token,
               
            });
            //极光推送
            // this.jPushPlugin.init();
            // this.jPush.init();
            //this.jPushPlugin.
            // this.jPush.setAlias(this.account);
          }

        }, (err) => {
          console.log(err);
        });
    }
    else {
      this.Service.alert('请填写完整信息后登入')
    }
  }


  youke(){
    this.navCtrl.push(TabsPage, {
      //传1到tab页，然后存储。（为1时首页上显示'去注册'）
      notoken: 'notoken',
    });
      this.storage.set('notoken', "notoken");

  }

}

