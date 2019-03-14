import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import {Constant} from '../../../service/Constant'


@Component({
  selector: 'page-Consultant',
  templateUrl: 'Consultant.html'
})
export class ConsultantPage{
  token
  content
  contact
  phone
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              storage: Storage,
              public alertCtrl: AlertController) {
    storage.ready().then(() => {
      storage.get('token').then((val) => {
        console.log('token', val);
        var token='token='+val;
        this.token = val;
      })
    });
  }
  fa() {
    let e = this.contact&&this.content&&this.phone ;
    console.log('val',e);
    let condition = e!=""&&e!=null

    if ( condition ) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let data = {};

      var url =  Constant.APP_URL +'sc/api/vip/addAdviser?';
      let token = 'token=' + this.token;
      let content = '&content=' + this.content;
      let contact = '&contact=' + this.contact;
      let phone = '&phone=' + this.phone;

      var URL = url + token + content + contact + phone;
      console.log('URL', URL)
      this.http.post(URL, JSON.stringify(data))
        .map(res => res.json())
        .subscribe(data => {
          console.log('提交', data);
//提交成功后清空数据
          this.content = null;
          this.contact =null;
          this.phone =null;

          let alert = this.alertCtrl.create({
            title: '提示!',
            subTitle: '提交成功!',
            buttons: ['好的']
          });
          alert.present();
        }, (err) => {
          console.log(err);
        });

    }
    else {
      let alert = this.alertCtrl.create({
        title: '提示!',
        subTitle: '填写信息不得为空!',
        buttons: ['好的']
      });
      alert.present();

    }
  }
}

