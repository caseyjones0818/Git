import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import {Constant} from '../../../../service/Constant'

@Component({
  selector: 'page-ConsignmentHosting',
  templateUrl: 'ResponseToPurchase.html'
})
export class ResponseToPurchasePage{
  data
  requestId
  token
  collectionId
  responseIds: Array<number> = [];
  checked
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              storage: Storage,
              public alertCtrl: AlertController) {
    this.requestId = navParams.get('requestId');
    storage.ready().then(() => {
      storage.get('token').then((val) => {
        console.log('token', val);
        var token='token='+val;
        this.token = val;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let data = {};
        var url = Constant.APP_URL +'sc/api/vip/getResponseBuyList?';
        let requestId = '&requestId='+this.requestId
        var URL =url+token+requestId;
        console.log('求购藏品列表',URL)
        this.http.post(URL, JSON.stringify(data))
          .map(res => res.json())
          .subscribe(data => {
            console.log('求购藏品列表',data);
            this.data = data.data;

          }, (err) => {
            console.log(err);
          });
      })
    });
  }


  fa() {
    let e = this.responseIds.length;
    let condition = e != 0;
    if (condition) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let data = {};
      let url = Constant.APP_URL +'sc/api/vip/sendResponseInfo?';
      let token = 'token=' + this.token;
      let requestId = '&requestId=' + this.requestId;
      let responseIds = '&responseIds=' + this.responseIds;
      var send_URL = url + token + requestId + responseIds;
      console.log('发送求购URL', send_URL);
      this.http.post(send_URL, JSON.stringify(data))
        .map(res => res.json())
        .subscribe(data => {
          console.log('发送求购', data);
          this.data = data.data
          let alert = this.alertCtrl.create({
            title: '提示!',
            subTitle: '发送成功!',
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


  logEvent(e,i) {
    console.log('点击check后的数据',e)
    let conditionT = e.checked===true;
    if(conditionT){
      console.log('为true的id',i)
      console.log('id数组',this.responseIds)

      //this.responseIds为check后的藏品ID
      this.responseIds.push(i)

    }

    let conditionF = e.checked===false;
    if(conditionF) {
      console.log('为false的id', i);
      console.log('id数组', this.responseIds)
      let index: number = this.responseIds.indexOf(i);

      //this.responseIds为check后的藏品ID
      this.responseIds.splice(index);

    }

  }
}

