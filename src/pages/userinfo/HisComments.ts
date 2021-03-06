import { Component} from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Constant} from '../../service/Constant'


@Component({
  templateUrl: 'HisComments.html'
})
export class HisCommentsPage {
  userId
  data
  commentContent
  constructor(public navCtrl: NavController,
              private http: Http,
              public navParams: NavParams,) {
    this.userId = navParams.get('userId')
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let data = {};
    var url = Constant.APP_URL +'sc/api/my/meComment?';
    var userId ='userId='+this.userId;
    var URL =url+userId;
    this.http.post(URL, JSON.stringify(data))
      .map(res => res.json())
      .subscribe(data => {
        console.log('我的评论',data);
        this.data = data.data
        this.commentContent = data.data.commentContent
      }, (err) => {
        console.log(err);
      });
  }
  goBack() {
    this.navCtrl.pop();
  }


}
