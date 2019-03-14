import { Component } from '@angular/core';

import { UploadService } from "../../service/upload.service";
import { ImageParam } from "./image-param";
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { CameraOptions, Camera, ImagePickerOptions, ImagePicker } from "ionic-native/dist/es5/index";
import { AppService } from '../../service/AppService';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [AppService]
})
export class ContactPage {
  imagePaths: Array<string> = [];
  content
  pet: string = "jiandin";
  token;
  storage;
  category_id;
  categoryList;
  title
  id
  imageUrls
  festId
  image
  gold
  Service
  disabled
  constructor(private uploadService: UploadService,
    private actionsheetCtrl: ActionSheetController,
    storage: Storage,
    public alertCtrl: AlertController,
    private appService: AppService,
    public loadingCtrl: LoadingController
  ) {
    this.Service = appService
    this.storage = storage;
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
            this.gold = data.data.gold
            this.categoryList = data.data.categoryList;
            this.id = this.categoryList.id;
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


  //清除照片
  clean() {
    this.imagePaths.splice(0, this.imagePaths.length);
  }

  jiaoliuupload() {
     // Create the popup
      let loadingPopup = this.loadingCtrl.create({
      });
      // Show the popup
      loadingPopup.present();
    this.disabled = true;
    // 这里设置为你的后台上传图片所需的参数
    var uploadParams = new ImageParam();
    uploadParams.ftype = 'image';
    uploadParams.utype = 'goods';
    // 注入UploadService
    this.uploadService.uploadImages(uploadParams, this.imagePaths).subscribe((imgsdata) => {
      setTimeout(() => {
      this.imageUrls = imgsdata;
      // 获得所有上传图片返回的uri之后，再做你想做的事情
      // 这里拿到的后台返回的imageUrls数组与之前图片的本地url的filePaths数组的顺序是一致的
      // 也就是说不管上传图片谁先请求成功，ForkJoinObservable内部会按照之前信号数组添加的顺序将后台返回的数据排好序放在imageUrls数组中,
      // 这点还是不错的
      let url = 'sc/api/cang/addCollection?';
      let token = 'token=' + this.token;
      let category_id = '&category_id=' + this.category_id;
      let title = '&title=' + this.title;
      let content = '&content=' + this.content;
      let imgs = '&imgs=' + this.imageUrls;
      let URL = url + token + category_id + title + content + imgs;

      this.Service.post(URL).subscribe((data: any) => {
        if (this.Service.nologin(data)) {//判断success和status的值
          this.content = '';
          this.title = '';
          this.imagePaths.splice(0, this.imagePaths.length);
          this.Service.alert('上传成功！')
          this.disabled = false;
        }
        else {
          this.Service.alert('访问出错请重新登录')
          this.disabled = false;
        }
         loadingPopup.dismiss();
        }, 1000);
      },
        err => {
          console.log('报错', err);
        });


    });

  }


  jiandinupload() {
    // Create the popup
      let loadingPopup = this.loadingCtrl.create({
      });
      // Show the popup
      loadingPopup.present();
    this.disabled = true;
    // 这里设置为你的后台上传图片所需的参数
    var uploadParams = new ImageParam();
    uploadParams.ftype = 'image';
    uploadParams.utype = 'goods';
    // 注入UploadService
    this.uploadService.uploadImages(uploadParams, this.imagePaths).subscribe((imgsdata) => {
       setTimeout(() => {
      this.imageUrls = imgsdata;
      // 获得所有上传图片返回的uri之后，再做你想做的事情
      // 这里拿到的后台返回的imageUrls数组与之前图片的本地url的filePaths数组的顺序是一致的
      // 也就是说不管上传图片谁先请求成功，ForkJoinObservable内部会按照之前信号数组添加的顺序将后台返回的数据排好序放在imageUrls数组中,
      // 这点还是不错的

      if (this.gold > 99) {
        let url = 'sc/api/cang/addAppraisal?';
        let token = 'token=' + this.token;
        let category_id = '&category_id=' + this.category_id;
        let title = '&title=' + this.title;
        let content = '&content=' + this.content;
        let imgs = '&imgs=' + this.imageUrls;
        let URL = url + token + category_id + title + content + imgs;
        this.Service.post(URL).subscribe((data: any) => {
          if (this.Service.nologin(data)) {//判断success和status的值
            this.content = '';
            this.title = '';
            this.imagePaths.splice(0, this.imagePaths.length);
            this.Service.alert('上传成功！');
            this.disabled = false;

          }
          else {
            this.Service.alert('访问出错请重新登录');
            this.disabled = false;

          }
          
        },
          err => {
            console.log('报错', err);
          });
      } else {
        this.Service.alert('金币少于99，请去充值!')
        this.disabled = false;

      }
        loadingPopup.dismiss();
        }, 1000);

    }, error => {
      console.log('上传失败');
    });

  }
  //change监控藏品类别的id变化
  festSelected(e, i) {
    console.log('id', i)
    this.category_id = i
  }


  addImg() {
    let actionSheet = this.actionsheetCtrl.create({
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            this.pickImage();
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePhoto(): void {
    let options: CameraOptions = {
      sourceType: Camera.PictureSourceType.CAMERA,
      destinationType: Camera.DestinationType.FILE_URI,
      correctOrientation: true,
      quality: 50,
      targetWidth: 720,
      encodingType: Camera.EncodingType.JPEG
    };
    Camera.getPicture(options).then((imageURI) => {
      this.imagePaths.push(imageURI);
    }, (error) => {
      console.log(error);
    });
  }

  pickImage(): void {
    let options: ImagePickerOptions = {
      maximumImagesCount: 6,
      quality: 3
    };
    ImagePicker.getPictures(options).then((results) => {
      this.imagePaths = this.imagePaths.concat(results);

    }, (error) => {
      console.log(error);
    });
  }




}
