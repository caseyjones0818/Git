import { Component,ViewChild } from '@angular/core';
import { NavController,ModalController,NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Content } from 'ionic-angular';

import { jiandinPage } from '../quan/QuanTabs/jiandin';
import { nojiandinPage } from '../quan/QuanTabs/nojiandin';

import { jinriPage } from '../quan/QuanTabs/jinri';
import { jiaoliuPage } from '../quan/QuanTabs/jiaoliu';
import { QuanImgPage } from  '../quan/QuanImg';
import {Constant} from '../../service/Constant'


@Component({
  selector: 'page-quan',
  templateUrl: 'quan.html'
})
export class QuanPage {
  @ViewChild(Content) content: Content;
  shouCangQuan: string = "jiandin";
  jiandinInterface:any;
  jinriInterface:any;
  jiaoliuInterface:any;
  pageInde:any = 0;
  params:any;
  
  //页面跳转类型
  https
  search = ''
  constructor( public navCtrl: NavController,public modalCtrl: ModalController,private http: Http,public navParams: NavParams ) {

    this.https = http
    var jiandinUrl = Constant.APP_URL +'sc/api/shou/appraisalList';
    var jinriUrl = Constant.APP_URL +'sc/api/shou/collectionCircle';
    var jiaoliuUrl = Constant.APP_URL +'sc/api/shou/allCollection';
    this.http.get(jiandinUrl+'?pageIndex=0&pageSize=20').map(res => res.json()).subscribe(data => {
        if(data.success == true){
          this.jiandinInterface = data.data;
          console.log(data);
        }
        else {
          console.log('接口访问出错')
        }
      },
      err => {
        console.log('报错');
      });

    this.http.get(jinriUrl).map(res => res.json()).subscribe(data => {
        if(data.success == true){
          this.jinriInterface = data.data;
          console.log(data);
        }
        else {
          console.log('接口访问出错')
        }
      },
      err => {
        console.log('报错');
      });

    this.http.get(jiaoliuUrl+'?pageIndex=0&pageSize=20').map(res => res.json()).subscribe(data => {
        if(data.success == true){
          this.jiaoliuInterface = data.data;
          console.log(data);
        }
        else {
          console.log('接口访问出错')
        }
      },
      err => {
        console.log('报错');
      });


  }


//图片查看器
//   push= (img:any, index:number): any =>{
//     this.navCtrl.push(QuanImgPage, {
//       'img':img,
//       'index': index,
//     });
//     console.log('点击图片数据',img)
//   }


  // pushJiandinDetailed= (id:any): any =>{
  //   this.navCtrl.push(jiandinPage, {
  //     'id': id,
  //   });
  // }
  pushJiandinDetailed= (data:any): any =>{
 console.log('iddd',data);
    this.navCtrl.push(jiandinPage, {
      'id': data.id,
     
    });
  }
  pushNoJiandinDetailed= (data:any): any =>{
      this.navCtrl.push(nojiandinPage, {
        'data': data,
      });
    }
  pushJiaoliuDetailed= (data:any): any =>{
    this.navCtrl.push(jiaoliuPage, {
      'id': data.id,
    });
  }

  pushJinriDetailed= (data:any): any =>{
    this.navCtrl.push(jinriPage, {
      'id': data.id,
    });
  }

//鉴定上下拉刷新
  doRefreshJiandin(refresher) {
    var jiandinUrl = Constant.APP_URL +'sc/api/shou/appraisalList';

    console.log('Begin async operation', refresher);
    setTimeout(() => {
      this.http.get(jiandinUrl+'?pageIndex=0&pageSize=20').map(res => res.json()).subscribe(data => {
          if(data.success == true){
            this.jiandinInterface = data.data;
            console.log(data);
          }
          else {
            console.log('接口访问出错')
          }
        },
        err => {
          console.log('报错');
        });      refresher.complete();
    }, 2000);
  }


  doInfiniteJiandin(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      var pageinde=this.pageInde++;
      this.httpDataJiandin(pageinde);

      console.log('Async operation has ended');

      infiniteScroll.complete();
    }, 500);
  }

  httpDataJiandin(pageInde) {
    var url=Constant.APP_URL +'sc/api/shou/appraisalList?pageIndex='+pageInde+'&pageSize=20';

    this.http.get(url).map(res => res.json()).subscribe(data => {
        if (data.success == true) {

          for(let i=0;i<data.data.length;i++){
            this.jiandinInterface.push(data.data[i]);
          }

          console.log(data);
          console.log(this.jiandinInterface);
        }
        else {
          console.log('接口访问出错')
        }
      },
      err => {
        console.log('报错');
      });
  }


  //今日下拉刷新
  doRefreshJinri(refresher) {
    console.log('Begin async operation', refresher);
    var jinriUrl = Constant.APP_URL +'sc/api/shou/collectionCircle';

    setTimeout(() => {
      this.http.get(jinriUrl).map(res => res.json()).subscribe(data => {
          if(data.success == true){
            this.jinriInterface = data.data;
            console.log(data);
          }
          else {
            console.log('接口访问出错')
          }
        },
        err => {
          console.log('报错');
        });      refresher.complete();
    }, 2000);
  }

  //藏品交流上下拉刷新

  doRefreshJiaoliu(refresher) {
    console.log('Begin async operation', refresher);
    var jiaoliuUrl = Constant.APP_URL +'sc/api/shou/allCollection';
    setTimeout(() => {
      this.http.get(jiaoliuUrl+'?pageIndex=0&pageSize=20').map(res => res.json()).subscribe(data => {
          if(data.success == true){
            this.jiaoliuInterface = data.data;
            console.log(data);
          }
          else {
            console.log('接口访问出错')
          }
        },
        err => {
          console.log('报错');
        });      refresher.complete();
    }, 2000);
  }


  doInfiniteJiaoliu(infiniteScroll) {
    setTimeout(() => {
      var pageinde=this.pageInde++;
      this.httpDataJiaoliu(pageinde);
      infiniteScroll.complete();
    }, 500);
  }

  httpDataJiaoliu(pageInde) {
    var url=Constant.APP_URL +'sc/api/shou/allCollection?pageIndex='+pageInde+'&pageSize=20';
    this.http.get(url).map(res => res.json()).subscribe(data => {
        if (data.success == true) {
          for(let i=0;i<data.data.length;i++){
            this.jiaoliuInterface.push(data.data[i]);
          }
          console.log(data);
          console.log(this.jiaoliuInterface);
        }
        else {
          console.log('接口访问出错')
        }
      },
      err => {
        console.log('报错');
      });
  }
  //搜索框
  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() === "") {
      this.can()
    }
    if (val === "") {
      this.can()
    }

  }
  onClear(ev){
    this.can()
    }
  onCancel(ev){
    this.can()
  }
    can(){
  var jiandinUrl = Constant.APP_URL +'sc/api/shou/appraisalList';
  this.https.get(jiandinUrl+'?pageIndex=0&pageSize=20').map(res => res.json()).subscribe(data => {
  if(data.success == true){
  this.jiandinInterface = data.data;
  console.log(data);
}
else {
  console.log('接口访问出错')
}
},
err => {
  console.log('报错');
});
}
  initializeItems(){
  let search =Constant.APP_URL +'sc/api/shou/search?'
    if(this.search!=""){
      let title = 'title='+this.search;
      let URL =search+title
      this.https.get(URL).map(res => res.json()).subscribe(data => {
          if(data.success == true){
            console.log('search',data);
            this.jiandinInterface = data.data;

          }
          else {
            console.log('接口访问出错')
          }
        },
        err => {
          console.log('报错');
        });
    }

}
 scrollTo() {
    // set the scrollLeft to 0px, and scrollTop to 500px
    // the scroll duration should take 200ms
    this.content.scrollTo(0, 0, 200);
  }
}



