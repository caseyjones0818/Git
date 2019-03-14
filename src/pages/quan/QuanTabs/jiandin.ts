import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ViewController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { QuanImgPage } from '../QuanImg';
import { userinfoPage } from '../../userinfo/userinfo';
import { jiandinSharePage } from '../../Share/jiandinShare';
import { AppService } from '../../../service/AppService';

@Component({
  selector: 'page-quan',
  templateUrl: 'jiandin.html',
  providers: [AppService]

})
export class jiandinPage {
  userinfoPage: any = userinfoPage;
  testRadioOpen: boolean;
  testRadioResult;
  DetailsImport: any;
  urlDetails: any;
  userName: any;
  avatar: any;
  imgList: any;
  introduction: any;
  famousName: any;
  insertDate: any;
  updateDate: any;
  title: any;
  categoryName: any;
  id: any;
  userId
  identifyResult
  token
  Service
  params
  favorite
  shoucangID
  rewardConfigList
  collection_id
  famousId
  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alerCtrl: AlertController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private http: Http,
    storage: Storage,
    private appService: AppService,
    public loadingCtrl: LoadingController

  ) {
    this.Service = appService;

    var token;
    storage.get('token').then((val) => {
      console.log("val:" + val)
      token = val;
      this.token = val;

      //鉴定列表ID 传值
      this.id = navParams.get('id')
      console.log('this.id ',this.id )
      var params = "id=" + this.id;
      if (this.token != null) {
        params += "&token=" + this.token;
        this.params = params
      }
      // Create the popup
      let loadingPopup = this.loadingCtrl.create({
      });
      // Show the popup
      loadingPopup.present();

      //详情页数据请求
      let url = 'sc/api/shou/appraisalDetail?';
      let URL = url + params
      console.log('URL',URL)
      this.Service.get(URL).subscribe((data: any) => {
        setTimeout(() => {
          this.urlDetails = data.data;
          this.userName = data.data.userName;
          this.avatar = data.data.avatar;
          this.imgList = data.data.imgList;
          this.introduction = data.data.introduction;
          this.famousName = data.data.famousName;
          this.insertDate = data.data.insertDate;
          this.updateDate = data.data.updateDate;
          this.title = data.data.title;
          this.identifyResult = data.data.identifyResult
          this.categoryName = data.data.categoryName;
          this.shoucangID = data.data.id
          this.favorite = data.data.favorite;
          this.rewardConfigList = data.data.rewardConfigList;
          this.famousId = data.data.famousId;
          this.userId = data.data.userId;
          console.log('ididi', this.shoucangID);

          console.log(url + params)
          console.log('Data', this.urlDetails);
        })
        loadingPopup.dismiss();
      }, 1000);
      

    })




  }

  //图片查看器
  push = (img: any, index: number): any => {
    this.navCtrl.push(QuanImgPage, {
      'img': img,
      'index': index,

    });
    console.log('详情点击图片', img)
  }
  //跳转用户信息页
  pushUserinfoPage = (userId: any): any => {
    this.navCtrl.push(userinfoPage, {
      'userId': userId
    });
  }
  //打赏功能模块
  doRadio() {
    let alert = this.alerCtrl.create();
    alert.setTitle('打赏鉴定师金币');
    alert.addInput({
      type: 'radio',
      label: this.rewardConfigList[0].amount,
      value: this.rewardConfigList[0].amount,
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: this.rewardConfigList[1].amount,
      value: this.rewardConfigList[1].amount
    });
    alert.addInput({
      type: 'radio',
      label: this.rewardConfigList[2].amount,
      value: this.rewardConfigList[2].amount
    });
    alert.addInput({
      type: 'radio',
      label: this.rewardConfigList[3].amount,
      value: this.rewardConfigList[3].amount
    });
    alert.addButton('取消');
    alert.addButton({
      text: '确认',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
        let url = "sc/api/user/addRewardLog?";
        let token = 'token=' + this.token;
        let collection_id = '&collection_id=' + this.shoucangID;
        let famous_id = '&famous_id=' + this.famousId;
        let amount = '&amount=' + data
        let URL = url + token + collection_id + famous_id + amount;
        console.log(URL)
        this.Service.post(URL).subscribe((data: any) => {
          console.log('打赏成功data', data);

          if (this.Service.nologin(data)) {//判断success和status的值
            this.Service.alert('打赏成功！')

          }
          else {
            this.Service.alert('访问出错请重新登录')
          }
        },
          err => {
            console.log('报错', err);
          });

      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }
  //头部返回模块
  goBack() {
    this.navCtrl.pop();
  }

  shoucang() {
    let url = 'sc/api/shou/addFavorites?';
    let collection_id = '&collection_id=' + this.shoucangID;
    let URL = url + 'token=' + this.token + collection_id;
    console.log(URL)
    this.Service.post(URL).subscribe((data: any) => {
      if (this.Service.nologin(data)) {//判断success和status的值
        console.log(data)
        let url = 'sc/api/shou/appraisalDetail?';
        let URL = url + this.params;
        this.Service.get(URL).subscribe((data: any) => {
          this.favorite = data.data.favorite
        });

      }
      else {
        this.Service.alert('访问出错请重新登录')
      }
    },
      err => {
        console.log('报错', err);
      });
  }
  bushoucang() {
    let url = 'sc/api/shou/delFavorites?';
    let collection_id = '&collection_id=' + this.shoucangID;
    let URL = url + 'token=' + this.token + collection_id;
    console.log(URL)
    this.Service.post(URL).subscribe((data: any) => {
      if (this.Service.nologin(data)) {//判断success和status的值
        console.log(data)
        let url = 'sc/api/shou/appraisalDetail?';
        let URL = url + this.params;
        this.Service.get(URL).subscribe((data: any) => {
          this.favorite = data.data.favorite
        })

      }
      else {
        this.Service.alert('访问出错请重新登录')
      }
    },
      err => {
        console.log('报错', err);
      });
  }

  goShare() {
    let modal = this.modalCtrl.create(jiandinSharePage, { shareData: this.urlDetails });
    modal.present();
  }
}




