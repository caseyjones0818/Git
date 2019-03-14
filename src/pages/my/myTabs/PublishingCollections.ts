import { Component } from '@angular/core';

import { NavController,NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { jiandinPage } from '../../quan/QuanTabs/jiandin';
import { jiaoliuPage } from '../../quan/QuanTabs/jiaoliu';
import {Constant} from '../../../service/Constant'

@Component({
  selector: 'page-quan',
  templateUrl: 'PublishingCollections.html'
})
export class PublishingCollectionsPage {
  pet: string = "cangpin";

  cangpin_data
  jindin_data

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              storage: Storage,) {
    storage.ready().then(() => {
      storage.get('token').then((val) => {
        console.log('token', val);
        var token='token='+val;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let data = {};
        var cangpin_URL = Constant.APP_URL +'sc/api/my/meFaCollection?';
        this.http.post(cangpin_URL+token, JSON.stringify(data))
          .map(res => res.json())
          .subscribe(data => {
            console.log('cangpin_URL',data);
            this.cangpin_data = data.data;

          }, (err) => {
            console.log(err);
          });
        var jiandin_URL = Constant.APP_URL +'sc/api/my/meFaAppraisal?';
        this.http.post(jiandin_URL+token, JSON.stringify(data))
          .map(res => res.json())
          .subscribe(data => {
            console.log('jiandin_URL',data);
            this.jindin_data = data.data;

          }, (err) => {
            console.log(err);
          });
      })
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
  pushJiandinDetailed= (data:any): any =>{
    this.navCtrl.push(jiandinPage, {
      'id': data.id,
    });
  }
  pushcangpinDetailed= (data:any): any=>{
    this.navCtrl.push(jiaoliuPage, {
      'id': data.id,
    });
  }

}
