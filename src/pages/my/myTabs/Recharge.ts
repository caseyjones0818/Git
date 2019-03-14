import { Component } from '@angular/core';

import { Storage } from '@ionic/storage';

import { NavController, LoadingController } from 'ionic-angular';
import { AppService } from '../../../service/AppService';

@Component({
  selector: 'page-recharge',
  templateUrl: 'Recharge.html',
  providers: [AppService]

})
export class RechargePage {
  Service
  token
  amount
  charge
  orderNo
  success
  cancel
  zhifu
  constructor(public navCtrl: NavController,
    storage: Storage,
    private appService: AppService,
    public loadingCtrl: LoadingController) {
      
    this.Service = appService;
    storage.get('token').then((val) => {
      this.token = val;
    });
  }
  goBack() {
    this.navCtrl.pop();
  }
  recharge: any = null;

  chongzhi() {
    let e = this.recharge != null && this.recharge != '';
    if (e) {
      // Create the popup
      let loadingPopup = this.loadingCtrl.create({
      });
      // Show the popup
      loadingPopup.present();
      let enabled;
      let that = this;
      let ping = (<any>window).Pingpp;
      let url = 'sc/api/charge/rechargeGold?';
      let token = 'token=' + this.token;
      let type = '&type=' + this.zhifu;
      let amount = '&amount=' + this.recharge;
      let URL = url + token + type + amount;
      this.Service.post(URL).subscribe((data: any) => {
        // I've added this timeout just to show the loading popup more time
        setTimeout(() => {
          if (this.Service.nologin(data)) {//判断success和status的值
            console.log('chongzhi', data)
            this.charge = data.data.charge;
            this.orderNo = data.data.order_no;
            ping.createPayment(this.charge, function (result, error) {
              // alert(error);
              if (result == 'success') {
                let url = 'sc/api/charge/payResult?';
                let token = 'token=' + that.token;
                let amount = '&amount=' + that.recharge;
                let orderNo = '&orderNo=' + that.orderNo;
                let URL = url + token + orderNo + amount;
                that.Service.post(URL).subscribe((data: any) => {
                  if (that.Service.nologin(data)) {//判断success和status的值
                  }
                  else {
                    that.Service.alert('访问出错请重新登录')
                  }
                },
                  err => {
                    console.log('报错', err);
                  });
              };
            })
          
          }
          else {
            this.Service.alert('访问出错请重新登录')
          }
          loadingPopup.dismiss();
        }, 500);


      },
        err => {
          console.log('报错', err);
        });
    }
    else {
      this.Service.alert('金币数量为空')

    }
  }

 zhifuRadio(e){
   console.log('zhifu',e)
   this.zhifu=e;
 }
}
