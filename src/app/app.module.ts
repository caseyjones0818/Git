import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler,} from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { CountdownModule } from 'ngx-countdown';
import { IonJPushModule } from 'ionic2-jpush'
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { SwiperModule } from 'angular2-useful-swiper'; //or for angular-cli the path will be ../../node_modules/angular2-useful-swiper



import { MyApp } from './app.component';
import { LoginInterfacePage } from '../pages/LoginInterface/LoginInterface';
import { forgetPasswordPage } from '../pages/LoginInterface/forgetPassword';

import { RegisterAccountPage } from '../pages/RegisterAccount/RegisterAccount';

//收藏圈路由接口
import { QuanPage } from '../pages/quan/quan';
import { jiandinPage } from '../pages/quan/QuanTabs/jiandin';
import { nojiandinPage } from '../pages/quan/QuanTabs/nojiandin';
import { jinriPage } from '../pages/quan/QuanTabs/jinri';
import { jiaoliuPage } from '../pages/quan/QuanTabs/jiaoliu';
import { commentPage } from '../pages/quan/QuanTabs/comment/comment';
import { ContactPage } from '../pages/contact/contact';

import { HomePage } from '../pages/home/home';
import { MyPage } from '../pages/my/my';
//VIP专区路由接口
import { VIPPage } from '../pages/VIP/VIP';
import { HomeImprovementPage } from '../pages/VIP/HomeImprovement/HomeImprovement';
import { ConsignmentHostingPage } from '../pages/VIP/ConsignmentHosting/ConsignmentHosting';
import { RepairConsultationPage } from '../pages/VIP/RepairConsultation/RepairConsultation';
import { PhotographyPage } from '../pages/VIP/Photography/Photography';
import { ConsultantPage } from '../pages/VIP/Consultant/Consultant';
import { BuyingInformationPage } from '../pages/VIP/BuyingInformation/BuyingInformation';
import { NeedtobuyPage } from '../pages/VIP/BuyingInformation/Needtobuy/Needtobuy';
import { ResponseToPurchasePage } from '../pages/VIP/BuyingInformation/ResponseToPurchase/ResponseToPurchase';
import { VIPserviceDetailsPage } from '../pages/VIP/VIPserviceDetails/VIPserviceDetails';
import { PrecautionsPage } from '../pages/VIP/HomeImprovement/Precautions/Precautions';

import { TabsPage } from '../pages/tabs/tabs';
import { RechargePage } from '../pages/my/myTabs/Recharge';
import { EarnGoldPage } from '../pages/my/myTabs/EarnGold';
import { MyNewsPage } from '../pages/my/myTabs/MyNews';
import { PublishingCollectionsPage } from '../pages/my/myTabs/PublishingCollections';
import { PostCommentPage } from '../pages/my/myTabs/PostComment';
import { FavoritePage } from '../pages/my/myTabs/Favorite';
import { GoldMallPage } from '../pages/my/myTabs/GoldMall';
import { InviteFriendsPage } from '../pages/my/myTabs/InviteFriends';
import { followerPage } from '../pages/follower/follower';
import { followPage } from '../pages/follow/follow';
import { sitePage } from '../pages/my/site/site';


import { changePasswordPage } from '../pages/my/changePassword/changePassword';
import { MessageSettingsPage } from '../pages/my/MessageSettings/MessageSettings';
import { blacklistPage } from '../pages/my/blacklist/blacklist';
import { QuanImgPage } from '../pages/quan/QuanImg';
import { userinfoPage } from '../pages/userinfo/userinfo';
import { HisReleasePage } from '../pages/userinfo/HisRelease';
import { HisCommentsPage } from '../pages/userinfo/HisComments';



import { userFollowerPage } from '../pages/follower/userFollower';
import { userFollowPage } from '../pages/follow/userFollow';
import { SharePage } from '../pages/Share/Share';
import { jiandinSharePage } from '../pages/Share/jiandinShare';
import { inviteSharePage } from '../pages/Share/inviteShare';
import { jiandinManagePage } from '../pages/jiandinManage/jiandinManage';
import { JMcntPage } from '../pages/jiandinManage/JMcnt';


import {UploadService} from "../service/upload.service";






@NgModule({
  declarations: [
    MyApp,
    LoginInterfacePage,
    forgetPasswordPage,
    RegisterAccountPage,
    QuanPage,
    jiandinPage,
    nojiandinPage,
    jinriPage,
    jiaoliuPage,
    commentPage,
    ContactPage,
    HomePage,
    VIPPage,
    HomeImprovementPage,
    ConsignmentHostingPage,
    RepairConsultationPage,
    PhotographyPage,
    ConsultantPage,
    BuyingInformationPage,
    NeedtobuyPage,
    ResponseToPurchasePage,
    VIPserviceDetailsPage,
    PrecautionsPage,
    MyPage,
    TabsPage,
    RechargePage,
    EarnGoldPage,
    MyNewsPage,
    PublishingCollectionsPage,
    PostCommentPage,
    FavoritePage,
    GoldMallPage,
    InviteFriendsPage,
    followerPage,
    followPage,
    sitePage,
    changePasswordPage,
    MessageSettingsPage,
    blacklistPage,
    QuanImgPage,
    userinfoPage,
    HisReleasePage,
    HisCommentsPage,
    userFollowerPage,
    userFollowPage,
    SharePage,
    jiandinSharePage,
    inviteSharePage,
    jiandinManagePage,
    JMcntPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回',
    }),
    IonicStorageModule.forRoot(),
    CountdownModule,
    IonJPushModule,
    SwiperModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginInterfacePage,
    forgetPasswordPage,
    RegisterAccountPage,
    QuanPage,
    jiandinPage,
    nojiandinPage,
    jinriPage,
    jiaoliuPage,
    commentPage,
    ContactPage,
    HomePage,
    VIPPage,
    HomeImprovementPage,
    ConsignmentHostingPage,
    RepairConsultationPage,
    PhotographyPage,
    ConsultantPage,
    BuyingInformationPage,
    NeedtobuyPage,
    ResponseToPurchasePage,
    VIPserviceDetailsPage,
    PrecautionsPage,
    MyPage,
    TabsPage,
    RechargePage,
    EarnGoldPage,
    MyNewsPage,
    PublishingCollectionsPage,
    PostCommentPage,
    FavoritePage,
    GoldMallPage,
    InviteFriendsPage,
    followerPage,
    followPage,
    sitePage,
    changePasswordPage,
    MessageSettingsPage,
    blacklistPage,
    QuanImgPage,
    userinfoPage,
    HisReleasePage,
    HisCommentsPage,
    userFollowerPage,
    userFollowPage,
    SharePage,
    jiandinSharePage,
    inviteSharePage,
    jiandinManagePage,
    JMcntPage
  ],
  providers: [UploadService,ThemeableBrowser,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}

