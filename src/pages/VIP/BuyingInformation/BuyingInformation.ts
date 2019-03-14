import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { NeedtobuyPage } from '../BuyingInformation/Needtobuy/Needtobuy';
import { ResponseToPurchasePage } from '../BuyingInformation/ResponseToPurchase/ResponseToPurchase';
import { Constant } from '../../../service/Constant'
import { AppService } from '../../../service/AppService';

@Component({
  selector: 'page-BuyingInformation',
  templateUrl: 'BuyingInformation.html',
  providers: [AppService]

})
export class BuyingInformationPage {
  NeedtobuyPage: any = NeedtobuyPage;
  data
  Index: any = 0;
  Service
  token
  categoryList
  category_id
  storage
  Time
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    storage: Storage,
    private appService: AppService, ) {
    this.storage = storage
    storage.ready().then(() => {
      storage.get('token').then((val) => {
        console.log('token', val);
        var token = 'token=' + val;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let data = {};
        var category_id = 'category_id=' + '-1'
        var sort = '&sort=' + 'desc'
        var url = Constant.APP_URL + 'sc/api/vip/getRequestBuyList?';
        var URL = url + category_id + sort
        console.log('url', URL)
        this.http.post(URL, JSON.stringify(data))
          .map(res => res.json())
          .subscribe(data => {
            console.log('求购信息', data);
            this.data = data.data

          }, (err) => {
            console.log(err);
          });
      })
    });

    storage.get('token').then((val) => {
      this.Service = appService

      this.token = val;
      let url = 'sc/api/cang/releaseAppraisal?';
      let token = 'token=' + this.token;
      let URL = url + token;
      this.Service.post(URL).subscribe((data: any) => {

        if (this.Service.nologin(data)) {//判断success和status的值
          console.log('releaseAppraisal', data);
          this.categoryList = data.data.categoryList;
        }
        else {
          this.Service.alert('访问出错请重新登录')
        }

      },
        err => {
          console.log('报错', err);
        });
    })
  }

  //change监控藏品类别的id变化
  festSelected(e, i) {
    console.log('id', i)
    this.category_id = i;
    this.storage.ready().then(() => {
      this.storage.get('token').then((val) => {
        console.log('token', val);
        var token = 'token=' + val;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let data = {};
        var category_id = 'category_id=' + this.category_id ;
        var sort = '&sort=' + 'desc'
        var url = Constant.APP_URL + 'sc/api/vip/getRequestBuyList?';
        var URL = url + category_id + sort
        console.log('url', URL)
        this.http.post(URL, JSON.stringify(data))
          .map(res => res.json())
          .subscribe(data => {
            console.log('求购信息', data);
            this.data = data.data

          }, (err) => {
            console.log(err);
          });
      })
    });
  }
  
  osSelected(e, i){
    this.Time=i;
     this.storage.ready().then(() => {
      this.storage.get('token').then((val) => {
        console.log('token', val);
        var token = 'token=' + val;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let data = {};
        var category_id = 'category_id=' + '-1' ;
        var sort = '&sort=' + this.Time;
        var url = Constant.APP_URL + 'sc/api/vip/getRequestBuyList?';
        var URL = url + category_id + sort
        console.log('url', URL)
        this.http.post(URL, JSON.stringify(data))
          .map(res => res.json())
          .subscribe(data => {
            console.log('求购信息', data);
            this.data = data.data

          }, (err) => {
            console.log(err);
          });
      })
    });
  }

  doRefresh(refresher) {
        setTimeout(() => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let data = {};
        var category_id = 'category_id=' + '-1'
      var sort = '&sort=' + 'desc'
      var url = Constant.APP_URL + 'sc/api/vip/getRequestBuyList?';
        var URL = url + category_id + sort
      console.log('url', URL)
      this.http.post(URL, JSON.stringify(data))
          .map(res => res.json())
          .subscribe(data => {
            console.log('求购信息', data);
            this.data = data.data

          }, (err) => {
            console.log(err);
          });
        refresher.complete();
      }, 2000);
  }


  doInfinite(infiniteScroll) {
    setTimeout(() => {
      var Index = this.Index++;
      this.httpData(Index);
      infiniteScroll.complete();
    }, 500);
  }

  httpData(Index) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let data = {};
    var category_id = '&category_id=' + '-1'
    var sort = '&sort=' + 'desc'
    var url = Constant.APP_URL + 'sc/api/vip/getRequestBuyList?pageIndex=' + Index + '&pageSize=10';
    var URL = url + category_id + sort
    this.http.post(URL, JSON.stringify(data))
      .map(res => res.json())
      .subscribe(data => {
        if (data.success == true) {
          for (let i = 0; i < data.data.length; i++) {
            this.data.push(data.data[i]);
          }
          console.log(data);
          console.log(this.data);
        }
        else {
          console.log('接口访问出错')
        }
      },
      err => {
        console.log('报错');
      });
  }

  push = (requestId: any): any => {
    this.navCtrl.push(ResponseToPurchasePage, {
      'requestId': requestId,
    });
  }
}

