import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {md5} from '../../../service/md5'
import {LoginInterfacePage} from '../../LoginInterface/LoginInterface';
import {Constant} from '../../../service/Constant'




@Component({
  selector: 'page-site',
  templateUrl: 'changePassword.html'
})
export class changePasswordPage {
  data
  account
  password
  phone
  newpassword
  storage
  notoken
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              storage: Storage,) {
    this.storage =storage
    console.log('phone',this.phone)
    storage.ready().then(() => {
      storage.get('phone').then((val) => {
        console.log('account', val);
          this.phone =val

      })
    });
  }
  goBack() {
    this.navCtrl.pop();
  }

  fa(){
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let data = {};
      var url = Constant.APP_URL +'sc/api/login/resetPassword?';
      var account='account='+this.phone;

      let e = md5(this.newpassword);
      var newpassword = '&password='+e;
      var URL =url+account+newpassword

      this.http.post(URL, JSON.stringify(data))
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          this.data = data.data
          //     //跳转首页
              this.navCtrl.push(LoginInterfacePage, {});


        }, (err) => {
          console.log(err);
        });
    }


}
