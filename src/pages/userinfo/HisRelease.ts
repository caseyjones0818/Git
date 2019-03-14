import { Component} from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { jiandinPage } from '../quan/QuanTabs/jiandin';
import { jiaoliuPage } from '../quan/QuanTabs/jiaoliu';
import {Constant} from '../../service/Constant'

@Component({
  selector: 'page-quan',
  templateUrl: 'HisRelease.html'
})
export class HisReleasePage {
  pet: string = "cangpin";
  cangpin_data
  jindin_data
  userId
  constructor(public navCtrl: NavController,private http: Http,
              public navParams: NavParams,
  ) {
    this.userId = navParams.get('userId')

    let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let data = {};
        var URL = Constant.APP_URL +'sc/api/my/meFaCollection?';
        var userId ='userId='+this.userId;
        var cangpin_URL = URL + userId;
        this.http.post(cangpin_URL, JSON.stringify(data))
          .map(res => res.json())
          .subscribe(data => {
            console.log('他发布的藏品',data);
            this.cangpin_data = data.data;

          }, (err) => {
            console.log(err);
          });
        var URL = Constant.APP_URL +'sc/api/my/meFaAppraisal?';
        var userId ='userId='+this.userId;
        var jiandin_URL = URL+userId;

    this.http.post(jiandin_URL, JSON.stringify(data))
          .map(res => res.json())
          .subscribe(data => {
            console.log('他发布的鉴定',data);
            this.jindin_data = data.data;

          }, (err) => {
            console.log(err);
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
