import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AppService } from '../../../../service/AppService';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-Needtobuy',
  templateUrl: 'Needtobuy.html',
  providers: [AppService]

})
export class NeedtobuyPage {
  Service
  token
  categoryList
  category_id
  title
  introduction
  constructor(public navCtrl: NavController,
    private appService: AppService,
    storage: Storage,
    public loadingCtrl: LoadingController


  ) {
    this.Service = appService
    storage.get('token').then((val) => {
      // Create the popup
      let loadingPopup = this.loadingCtrl.create({
      });
      // Show the popup
      loadingPopup.present();
      this.token = val;
      let url = 'sc/api/cang/releaseAppraisal?';
      let token = 'token=' + this.token;
      let URL = url + token;
      this.Service.post(URL).subscribe((data: any) => {
        setTimeout(() => {
          if (this.Service.nologin(data)) {//判断success和status的值
            console.log('releaseAppraisal', data);
            this.categoryList = data.data.categoryList;
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
    })

  }

  //change监控藏品类别的id变化
  festSelected(e, i) {
    console.log('id', i)
    this.category_id = i
  }


  fa() {
    let e = this.category_id && this.introduction && this.title;
    let condition = e != "" && e != null;
    if (condition){
      let url = 'sc/api/vip/addRequestBuy?';
      let token = 'token=' + this.token;
      let category_id = '&category_id=' + this.category_id;
      let title = '&title=' + this.title;
      let introduction = '&introduction=' + this.introduction;
      let URL = url + token + category_id + title + introduction;
      console.log('发求购url', URL)
      this.Service.post(URL).subscribe((data: any) => {
        if (this.Service.nologin(data)) {//判断success和status的值
          console.log('提交', data);
          this.Service.alert('发布成功');

        }
        else {
          this.Service.alert('访问出错请重新登录');
        }
      },
        err => {
          console.log('报错', err);
        });
    } else {
          this.Service.alert('请内容填写完整');

    }
  }

}

