import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Constant } from '../../../service/Constant'
import { QuanPage } from '../../quan/quan';
import { ContactPage } from '../../contact/contact';
import { InviteFriendsPage } from '../myTabs/InviteFriends';


@Component({
  selector: 'page-recharge',
  templateUrl: 'EarnGold.html'
})
export class EarnGoldPage {
  taskList: any;
  length
  title
  complete
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    storage: Storage, ) {

    storage.ready().then(() => {
      // set a key/value
      storage.get('token').then((val) => {
        console.log('token', val);
        var token = 'token=' + val;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let data = {};
        var url = Constant.APP_URL + 'sc/api/task/seeTask?';
        this.http.post(url + token, JSON.stringify(data))
          .map(res => res.json())
          .subscribe(data => {
            console.log('赚金币', data)
            this.taskList = data.data.taskList;
            this.title = this.taskList.title;
            this.complete = this.taskList.complete;
            // this.length=data.data.taskList;




          }, (err) => {
            console.log(err);
          });


      })

    });
  }
  EGpush(e) {
    console.log(e)

    if (e === 0 || e === 2) {
        this.navCtrl.push(QuanPage, {
      });
    }

    if (e === 1) {
      this.navCtrl.push(ContactPage, {
      });
    }

    if (e === 3) {
      this.navCtrl.push(InviteFriendsPage, {
      });
    }
  }

}
