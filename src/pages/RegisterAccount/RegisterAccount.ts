import { Component } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController,NavParams } from 'ionic-angular';
import { LoginInterfacePage } from '../LoginInterface/LoginInterface';
import {Constant} from '../../service/Constant'
import {md5} from '../../service/md5';
import {AppService} from '../../service/AppService';


@Component({
  selector: 'page-LoginInterface',
  templateUrl: 'RegisterAccount.html',
    providers  : [AppService]
})
export class RegisterAccountPage{
  LoginInterfacePage:any = LoginInterfacePage
  data
  phone
  user_name
  password
  inviteCode
  Service
  constructor(public navCtrl: NavController,
              private http: Http,
              public navParams: NavParams,
              private appService: AppService,) {
    this.Service = appService;

  }
  fa(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let data = {};
    var url = Constant.APP_URL + 'sc/api/verify/getVerifyCode?';
    var phone = 'phone='+this.phone;
    var URL = url + phone;
    this.http.post(URL, JSON.stringify(data))
      .map(res => res.json())
      .subscribe(data => {
        console.log('获取注册验证码',data);
        this.data = data.data;
        this.Service.alert(data.errMsg)

        console.log(data.errMsg)

      }, (err) => {
        console.log(err);
      });
  }
  go(){
    var url = Constant.APP_URL + 'sc/api/register/registerUser?';
    var phone = 'phone='+this.phone;
    var user_name = '&user_name=' + this.user_name;
    let md5_password = md5(this.password);

    var password = '&password=' + md5_password;
    var inviteCode = '&inviteCode=' + this.inviteCode;
    var URL = url + phone + user_name + password +inviteCode;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let data = {};
    this.http.post(URL, JSON.stringify(data))
      .map(res => res.json())
      .subscribe(data => {
        console.log('注册完成',data);
        this.data = data.data;
        this.Service.alert('注册完成')


      }, (err) => {
        console.log(err);
      });
  }
}

