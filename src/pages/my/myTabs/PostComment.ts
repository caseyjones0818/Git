import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AppService } from '../../../service/AppService';


@Component({

  templateUrl: 'PostComment.html',
  providers: [AppService]

})
export class PostCommentPage {
  data
  commentContent
  Service
  token
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    storage: Storage,
    private appService: AppService,
    public loadingCtrl: LoadingController
  ) {
    this.Service = appService;
    storage.ready().then(() => {
      storage.get('token').then((val) => {
        // Create the popup
        let loadingPopup = this.loadingCtrl.create({
        });
        // Show the popup
        loadingPopup.present();
        console.log('token', val);
        // var token='token='+val;
        this.token = val;
        var url = 'sc/api/my/meComment?';
        let token = 'token=' + this.token;
        let URL = url + token;
        this.Service.post(URL).subscribe((data: any) => {
          setTimeout(() => {
            if (this.Service.nologin(data)) {//判断success和status的值
              console.log('我的评论', data);
              this.data = data.data
              this.commentContent = data.data.commentContent
            }
            else {
              this.Service.alert('访问出错请重新登录')
            }
            loadingPopup.dismiss();
          }, 1000);
        },
          err => {
            console.log('报错', err);
          });

        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // let data = {};
        // var url = 'sc/api/my/meComment?';
        // this.http.post(url+token, JSON.stringify(data))
        //   .map(res => res.json())
        //   .subscribe(data => {
        //     console.log('我的评论',data);
        //     this.data = data.data
        //     this.commentContent = data.data.commentContent
        //   }, (err) => {
        //     console.log(err);
        //   });
      })
    });
  }
  goBack() {
    this.navCtrl.pop();
  }

}
