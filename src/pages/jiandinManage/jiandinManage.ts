import { Component, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppService } from '../../service/AppService';
import { JMcntPage } from '../jiandinManage/JMcnt';



@Component({
    selector: 'page-jiandinManage',
    templateUrl: 'jiandinManage.html',
    providers: [AppService]

})
@Injectable()
export class jiandinManagePage {
    storage
    Service
    data
    constructor(public navCtrl: NavController,
        storage: Storage,
        private appService: AppService,
    ) {
        this.storage = storage;
        this.Service = appService;
        let URL = 'sc/api/shou/appraisalNoList';

        this.Service.get(URL).subscribe((data: any) => {
            if (this.Service.nologin(data)) {//判断success和status的值
                console.log('jiandinManage', data);
                this.data = data.data;
            }
            else {
                this.Service.alert('访问出错请重新登录')
            }
        },
            err => {
                this.Service.alert('报错')

            });
    }
 push= (data:any): any =>{
 console.log('iddd',data);
    this.navCtrl.push(JMcntPage, {
      'data': data,
     
    });
  }



}
