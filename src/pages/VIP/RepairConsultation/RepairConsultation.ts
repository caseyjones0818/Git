import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { AppService } from '../../../service/AppService';



@Component({
  selector: 'page-ConsignmentHosting',
  templateUrl: 'RepairConsultation.html',
  providers: [AppService]

})
export class RepairConsultationPage {
  data
  Service
  storage
  responseIds: Array<number> = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    storage: Storage,
    private appService: AppService,
  ) {
    this.Service = appService;
    this.storage = storage;
    storage.get('token').then((val) => {
      console.log('token', val);
      let token = 'token=' + val;
      let url = 'sc/api/vip/getRepairList?';
      let URL = url + token;
      console.log('url', URL)
      this.Service.post(URL).subscribe((data: any) => {
        if (this.Service.nologin(data)) {//判断success和status的值
          console.log('修复', data);
          this.data = data.data;
        }
        else {
          this.Service.alert('访问出错请重新登录')
        }
      },
        err => {
          console.log('报错', err);
        });

    });
  }

  logEvent(e, i) {
    console.log('点击check后的数据', e)
    let conditionT = e.checked === true;
    if (conditionT) {
      console.log('为true的id', i)
      console.log('id数组', this.responseIds)

      //this.responseIds为check后的藏品ID
      this.responseIds.push(i)

    }

    let conditionF = e.checked === false;
    if (conditionF) {
      console.log('为false的id', i);
      console.log('id数组', this.responseIds)
      let index: number = this.responseIds.indexOf(i);

      //this.responseIds为check后的藏品ID
      this.responseIds.splice(index);

    }

  }

  fa() {
    let e = this.responseIds.length;
    let condition = e != 0;
    if (condition) {
      let url = 'sc/api/vip/updRepairStatus?';
      let collection_ids = 'collection_ids=' + this.responseIds;
      let URL = url + collection_ids;
      this.Service.post(URL).subscribe((data: any) => {
        if (this.Service.nologin(data)) {//判断success和status的值
          console.log(data);
          this.Service.alert('提交成功');
          //刷新数据
          this.storage.get('token').then((val) => {
            console.log('token', val);
            let token = 'token=' + val;
            let url = 'sc/api/vip/getRepairList?';
            let URL = url + token;
            console.log('url', URL)
            this.Service.post(URL).subscribe((data: any) => {
              if (this.Service.nologin(data)) {//判断success和status的值
                console.log('修复', data);
                this.data = data.data;
              }
              else {
                this.Service.alert('访问出错请重新登录')
              }
            },
              err => {
                console.log('报错', err);
              });
          
          });
          //刷新数据
        }
        else {
          this.Service.alert('访问出错请重新登录');
        }
      },
        err => {
          console.log('报错', err);
        });
    }
    else {
      this.Service.alert('请选择藏品')

    }
  }
}

