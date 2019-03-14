import {AlertController} from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http,Headers }from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Constant} from '../service/Constant'

@Injectable()

export class AppService {
  data
  constructor(public alertCtrl: AlertController,public http:Http) {
    this.http = http;

  }

   nologin(data){
     return data.success != false && data.status != -2;
  }

  alert(sub) {
    let alert = this.alertCtrl.create({
      title: '提示!',
      subTitle: sub,
      buttons: ['好的']
    });
    return alert.present();
  }
  get(importURL):Observable<any> {
    return this.http.get(Constant.APP_URL + importURL).map((res:any)=> {
      return res.json();
    });
  }
  //get服务模板
  // // this.Service.get(URL).subscribe((data:any) => {
  // if(this.Service.nologin(data)){//判断success和status的值
 
  //           }
  //           else {
  //             this.Service.alert('访问出错请重新登录')
  //           }
  //         },
  //         err => {
  //           console.log('报错');
  //         });



  post(importURL):Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let data = {};
    return this.http.post(Constant.APP_URL + importURL, JSON.stringify(data))
      .map((res:any)=> {
        return res.json();
      });
    }
    //post服务模板
//      this.Service.post(URL).subscribe((data:any) => {
//             if(this.Service.nologin(data)){//判断success和status的值
//             
                // }
//             else {
//               this.Service.alert('访问出错请重新登录')
//             }
//           },
//           err => {
//             console.log('报错',err);
//           });

}
