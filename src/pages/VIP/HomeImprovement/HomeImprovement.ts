import { Component } from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import {AppService} from '../../../service/AppService';
import { PrecautionsPage } from '../HomeImprovement/Precautions/Precautions';

@Component({
  selector: 'page-HomeImprovement',
  templateUrl: 'HomeImprovement.html',
  providers  : [AppService]

})
export class HomeImprovementPage{
  PrecautionsPage:any = PrecautionsPage;
  token
  data
  collectionCategoryBeanList
  homeDecorateServiceBeanList
  id
  put_position
  category_id
  start_money
  end_money
  service_id: Array<number> = [];
  company_name
  contact
  phone
  categoryName
  Service
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              storage: Storage,
              private appService: AppService) {
    this.Service = appService
    storage.ready().then(() => {
      storage.get('token').then((val) => {
        console.log('token', val);
        var token='token='+val;
        this.token = val;
      })
    });
    //进入家装data
    this.Service.get('sc/api/vip/toHomeDecorate').subscribe((data:any) => {
        if(this.Service.nologin(data)){
          this.data = data.data;
          console.log('进入家装data',data);
          this.collectionCategoryBeanList = data.data.collectionCategoryBeanList;
          this.homeDecorateServiceBeanList = data.data.homeDecorateServiceBeanList;
          this.id = this.collectionCategoryBeanList.id;
        }
        else {
          this.Service.alert('访问出错请重新登录')
        }
      },
      err => {
        console.log('报错',err);

    });

  }

  fa(){
    let e = this.put_position&&this.start_money&&this.end_money&&this.category_id&&this.company_name&&this.contact&&this.phone;
    let condition = e!=""&&e!=null
    let checkCondition = this.service_id.length!= 0;
    console.log(this.category_id)
    if( condition&&checkCondition ) {
      var url = 'sc/api/vip/addHomeDecorate?';
      let put_position = 'put_position=' + this.put_position;
      let start_money = '&start_money=' + this.start_money;
      let end_money = '&end_money=' + this.end_money;
      let category_id = '&category_id=' + this.category_id;
      let service_id = '&service_id=' + this.service_id;
      let company_name = '&company_name=' + this.company_name;
      let contact = '&contact=' + this.contact;
      let phone = '&phone=' + this.phone;
      var jiazhuang_URL = url + put_position + start_money + end_money + category_id + service_id + company_name + contact + phone;
      this.Service.post(jiazhuang_URL).subscribe((data:any) => {
          if(this.Service.nologin(data)){//判断success和status的值
            this.data = data.data;
            console.log('提交家装租赁',data);
            this.Service.alert('提交成功！')
            this.put_position=null;
            this.start_money=null;
            this.end_money=null;
            this.categoryName=null;
            this.contact=null;
            this.phone=null;
            this.company_name=null;
          }
          else {
            this.Service.alert('访问出错请重新登录')
          }
        },
        err => {
          console.log('报错',err);
        });

    }
    else {
      this.Service.alert('请填写完整信息后提交')
    }
  }
  festSelected(e,i) {
    console.log('id',i)
    this.category_id = i
  }

  logEvent(e,i) {
    console.log('点击check后的数据',e)
    let conditionT = e.checked===true;
    if(conditionT){
      console.log('为true的id',i)
      //this.responseIds为check后的ID
      this.service_id.push(i)
    }

    let conditionF = e.checked===false;
    if(conditionF){
      console.log('为false的id',i)
      //this.responseIds为check后的ID
      let index: number = this.service_id.indexOf(i);
      this.service_id.splice(index);

    }
  }
}

