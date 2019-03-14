import { Component } from '@angular/core';
import { NavController,ViewController,NavParams ,Slides} from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({

  templateUrl: 'QuanImg.html'
})
export class QuanImgPage {
  img:any;
  index:any;
  styleExp
  @ViewChild('slider') slider: Slides;
  public isLocked: boolean = false;
  sliderOptions: any;
  pagar:any;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private http: Http
  ) {
   

    this.sliderOptions = {
      pager: true
    };
    this.img = navParams.get('img');
    this.index = navParams.get('index')
    console.log(this.index)
  }
  goBack() {
    this.navCtrl.pop();
  }
  modaleBack() {
    this.viewCtrl.dismiss();
  }

  onDoubleClick = (e, slides: Slides):void => {
    this.isLocked = !this.isLocked;
    slides.lockSwipes(this.isLocked);
  }
  ionViewDidLoad() {
    this.sliderOptions = {
      pager:true,
      loop: true,
      zoom:true,
      initialSlide:this.index
    };

  }
 
}
