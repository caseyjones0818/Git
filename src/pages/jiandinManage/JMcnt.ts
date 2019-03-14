import { Component, Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppService } from '../../service/AppService';
import { QuanImgPage } from '../quan/QuanImg';


@Component({
    selector: 'page-jiandinManage',
    templateUrl: 'JMcnt.html',
    providers: [AppService]

})
@Injectable()
export class JMcntPage {
    storage
    Service
    data
    token
    JMcntdata


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
    content
    constructor(public navCtrl: NavController,
        storage: Storage,
        private appService: AppService,
        public navParams: NavParams,

    ) {
        this.JMcntdata = navParams.get('data')
        console.log(this.JMcntdata);
        this.userName = this.JMcntdata.userName;
        this.avatar = this.JMcntdata.avatar;
        this.imgList = this.JMcntdata.imgList;
        this.introduction = this.JMcntdata.introduction;
        this.famousName = this.JMcntdata.famousName;
        this.insertDate = this.JMcntdata.insertDate;
        this.title = this.JMcntdata.title;
        this.categoryName = this.JMcntdata.categoryName;
        this.id = this.JMcntdata.id;
        this.storage = storage;
        this.Service = appService;




    }

    //图片查看器
    push = (img: any, index: number): any => {
        this.navCtrl.push(QuanImgPage, {
            'img': img,
            'index': index,

        });
        console.log('详情点击图片', img)
    }
    fa() {
        this.storage.get('token').then((val) => {
            this.token = val;
            console.log(this.token)
            let token = 'token=' + this.token;
            let url = 'sc/api/shou/editAppraisal?';
                let content ='&content='+this.content
            let collection_id = '&collection_id=' + this.id;
            let URL = url + token + collection_id+content;
            console.log('URL', URL)
            this.Service.post(URL).subscribe((data: any) => {
                if (this.Service.nologin(data)) {//判断success和status的值

                }
                else {
                    this.Service.alert('访问出错请重新登录')
                }
            },
                err => {
                    console.log('报错', err);
                });
        })


    }

}
