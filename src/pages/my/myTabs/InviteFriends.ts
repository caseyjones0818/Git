import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Constant } from '../../../service/Constant'
import { AppService } from '../../../service/AppService';
import { inviteSharePage } from '../../Share/inviteShare';


@Component({

  templateUrl: 'InviteFriends.html',
  providers: [AppService]

})
export class InviteFriendsPage {
  Service
  data
  inviteCode
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    storage: Storage,
    private appService: AppService,
    public alerCtrl: AlertController,
    public modalCtrl: ModalController,


  ) {
    this.Service = appService;

    storage.ready().then(() => {
      storage.get('token').then((val) => {
        console.log('token', val);
        let token = 'token=' + val;
        let url = 'sc/api/register/toInvite?';
        let URL = url + token;
        this.Service.post(URL).subscribe((data: any) => {
          if (this.Service.nologin(data)) {//判断success和status的值
            console.log('邀请好友', data);
            this.data = data.data;
            this.inviteCode = this.data.inviteCode;
            console.log(this.inviteCode)
          }
          else {
            this.Service.alert('访问出错请重新登录')
          }
        },
          err => {
            console.log('报错', err);
          });
      })
    });
  }
  goBack() {
    this.navCtrl.pop();
  }

  goShare() {
    let modal = this.modalCtrl.create(inviteSharePage, { shareData: this.data });
    modal.present();
  }

}
