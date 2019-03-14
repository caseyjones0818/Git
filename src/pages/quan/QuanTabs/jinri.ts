import { Component } from '@angular/core';
import { NavController, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { QuanImgPage } from '../QuanImg'
import { commentPage } from '../QuanTabs/comment/comment'
import { userinfoPage } from '../../userinfo/userinfo';
import { AppService } from '../../../service/AppService';
import { SharePage } from '../../Share/Share'


@Component({
  selector: 'page-quan',
  templateUrl: 'jinri.html',
  providers: [AppService]

})
export class jinriPage {
  id: any;
  collectionDetailData: any;
  userName: any;
  avatar: any;
  imgList: any;
  title: any;
  introduction: any;
  insertDate: any;
  categoryName: any;
  commentCount: any;
  userId
  data
  comments
  token
  Service
  storage
  params
  collectionId
  favorite
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private http: Http,
    storage: Storage,
    private appService: AppService,
    public loadingCtrl: LoadingController
  ) {
    // var url = 'http://120.132.92.55/sc_api/sc/api/shou/collectionDetail?';
    this.Service = appService;
    this.storage = storage;
    // storage.set('name', 'Max');
    var token;
    storage.get('token').then((val) => {
      console.log("val:" + val)
      // token=val;
      this.token = val
      console.log('tokeddn', val)
      //鉴定列表ID 传值
      this.id = navParams.get('id');
      var params = "collection_id=" + this.id;

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
      let url = 'sc/api/shou/collectionDetail?';
      let URL = url + params;
      this.Service.get(URL).subscribe((data: any) => {
        setTimeout(() => {
          this.data = data.data
          this.comments = data.data.comments
          this.collectionDetailData = data.data.collection;
          this.collectionId = data.data.collection.id
          let Data = this.collectionDetailData;
          this.userName = Data.userName;
          this.avatar = Data.avatar;
          this.imgList = Data.imgList;
          this.title = Data.title;
          this.introduction = Data.introduction;
          this.insertDate = Data.insertDate;
          this.categoryName = Data.categoryName;
          this.commentCount = Data.commentCount;
          this.id = data.data.collection.id;
          this.favorite = data.data.collection.favorite;
          this.userId = data.data.collection.userId;

          console.log(url + params)
          console.log('藏品交流数据', this.data)
          console.log('藏品交流评论', this.comments)
        })
        loadingPopup.dismiss();
      }, 1000);

    })

  }


  ionViewDidEnter() {
    //详情页数据请求
    let url = 'sc/api/shou/collectionDetail?';
    let URL = url + this.params;
    this.Service.get(URL).subscribe((data: any) => {
      this.data = data.data
      this.comments = data.data.comments
      this.collectionDetailData = data.data.collection;
      this.collectionId = data.data.collection.id
      let Data = this.collectionDetailData;
      this.userName = Data.userName;
      this.avatar = Data.avatar;
      this.imgList = Data.imgList;
      this.title = Data.title;
      this.introduction = Data.introduction;
      this.insertDate = Data.insertDate;
      this.categoryName = Data.categoryName;
      this.commentCount = Data.commentCount;
      this.id = data.data.collection.id;
      this.favorite = data.data.collection.favorite;
      this.userId = data.data.collection.userId;

      console.log(url + this.params)
      console.log('藏品交流数据', this.data)
      console.log('藏品交流评论', this.comments)
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

  presentModal() {
    let modal = this.modalCtrl.create(QuanImgPage);
    modal.present();
  }
  // commentModal() {
  //     let modal = this.modalCtrl.create(commentPage,{ collectionId: this.collectionId});
  //     modal.present();
  //   }
  commentModal = (collectionId: any): any => {
    this.navCtrl.push(commentPage, {
      'collectionId': collectionId
    });
  }
  goBack() {
    this.navCtrl.pop();
  }

  shoucang() {
    let url = 'sc/api/shou/addFavorites?';
    let collection_id = '&collection_id=' + this.id;
    let URL = url + 'token=' + this.token + collection_id;
    console.log(URL)
    this.Service.post(URL).subscribe((data: any) => {
      if (this.Service.nologin(data)) {//判断success和status的值
        console.log(data)
        let url = 'sc/api/shou/collectionDetail?';
        let URL = url + this.params;
        this.Service.get(URL).subscribe((data: any) => {
          this.favorite = data.data.collection.favorite;
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
  bushoucang() {
    let url = 'sc/api/shou/delFavorites?';
    let collection_id = '&collection_id=' + this.id;
    let URL = url + 'token=' + this.token + collection_id;
    console.log(URL)
    this.Service.post(URL).subscribe((data: any) => {
      if (this.Service.nologin(data)) {//判断success和status的值
        console.log(data)

        let url = 'sc/api/shou/collectionDetail?';
        let URL = url + this.params;
        this.Service.get(URL).subscribe((data: any) => {
          this.favorite = data.data.collection.favorite;
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
  zan(ev) {
    let url = 'sc/api/shou/addCommentLike?'
    let token = 'token=' + this.token;
    let collection_id = '&collection_id=' + this.collectionId;
    let comment_id = '&comment_id=' + ev

    let URL = url + token + collection_id + comment_id
    this.Service.post(URL).subscribe((data: any) => {
      console.log('zan', data)

      if (this.Service.nologin(data)) {//判断success和status的值
        console.log(data);
        this.Service.alert('点赞成功')
        // this.ifzan=true;

        let url = 'sc/api/shou/collectionDetail?';
        let URL = url + this.params;
        this.Service.get(URL).subscribe((data: any) => {
          this.favorite = data.data.collection.favorite;
          // this.like =this.comments.like;

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
  buzan(ev) {
    let url = 'sc/api/shou/delCommentLike?'
    let token = 'token=' + this.token;
    let collection_id = '&collection_id=' + this.collectionId;
    let comment_id = '&comment_id=' + ev

    let URL = url + token + collection_id + comment_id
    this.Service.post(URL).subscribe((data: any) => {
      console.log('zan', data)
      this.Service.alert('已取消点赞')
      // this.ifzan=false;
      if (this.Service.nologin(data)) {//判断success和status的值
        console.log(data)
        let url = 'sc/api/shou/collectionDetail?';
        let URL = url + this.params;
        this.Service.get(URL).subscribe((data: any) => {
          this.favorite = data.data.collection.favorite;
          // this.like =this.comments.like;

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
    let modal = this.modalCtrl.create(SharePage, { shareData: this.collectionDetailData });
    modal.present();
  }

}




