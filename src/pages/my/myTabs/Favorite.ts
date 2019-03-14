import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { jiaoliuPage } from '../../quan/QuanTabs/jiaoliu';
import { Constant } from '../../../service/Constant'


@Component({
  selector: 'page-quan',
  templateUrl: 'Favorite.html'
})
export class FavoritePage {
  token
  data

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    storage: Storage,
    public loadingCtrl: LoadingController
  ) {
    storage.ready().then(() => {
      storage.get('token').then((val) => {
        // Create the popup
        let loadingPopup = this.loadingCtrl.create({
        });
        // Show the popup
        loadingPopup.present();
        console.log('token', val);
        var token = 'token=' + val;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let data = {};
        let url = Constant.APP_URL + 'sc/api/my/meFavorites?';
        let URL = url + token;
        this.http.post(URL, JSON.stringify(data))
          .map(res => res.json())
          .subscribe(data => {
            setTimeout(() => {
              console.log(data);
              this.data = data.data;
              loadingPopup.dismiss();
            }, 1000);
          },
          (err) => {
            console.log(err);
          });

      })

    });

  }
 
  pushcangpinDetailed = (data: any): any => {
    this.navCtrl.push(jiaoliuPage, {
      'id': data.id,
    });
  }

}
