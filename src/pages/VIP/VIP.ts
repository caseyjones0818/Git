import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import { AppService } from '../../service/AppService';


import { HomeImprovementPage } from '../VIP/HomeImprovement/HomeImprovement';
import { ConsignmentHostingPage } from '../VIP/ConsignmentHosting/ConsignmentHosting';
import { RepairConsultationPage } from '../VIP/RepairConsultation/RepairConsultation';
import { PhotographyPage } from '../VIP/Photography/Photography';
import { ConsultantPage } from '../VIP/Consultant/Consultant';
import { BuyingInformationPage } from '../VIP/BuyingInformation/BuyingInformation';
import { VIPserviceDetailsPage } from '../VIP/VIPserviceDetails/VIPserviceDetails';

@Component({
  selector: 'page-VIP',
  templateUrl: 'VIP.html',
  providers: [AppService]

})
export class VIPPage {
  lv
  token
  Service
  HomeImprovementPage: any = HomeImprovementPage;
  ConsignmentHostingPage: any = ConsignmentHostingPage;
  RepairConsultationPage: any = RepairConsultationPage;
  PhotographyPage: any = PhotographyPage;
  ConsultantPage: any = ConsultantPage;
  BuyingInformationPage: any = BuyingInformationPage;
  VIPserviceDetailsPage: any = VIPserviceDetailsPage;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    storage: Storage,
    private appService: AppService,
  ) {
    this.Service = appService;

    storage.get('token').then((val) => {
      let token = 'token=' + val;
      this.token =val;
      let url = 'sc/api/vip/vipIndex?';
      let URL = url + token;
      this.Service.post(URL).subscribe((data: any) => {
        if (this.Service.nologin(data)) {//判断success和status的值
          console.log('进入VIP', data);
          this.lv = data.data.vipLevel;
        }
        else {
          this.Service.alert('访问出错请重新登录')
        }
      },
        err => {
          console.log('报错', err);
        });

    });

    storage.get('login_data').then((val) => {
      console.log('login_data222', val)
    })
  }

  

}

