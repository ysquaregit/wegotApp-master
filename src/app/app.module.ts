import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {ChartsModule} from 'ng2-charts';
import {HttpModule} from '@angular/http';
import {CloudSettings, CloudModule} from '@ionic/cloud-angular';
import {MessageService} from './services/data.service';
import 'chartjs-plugin-zoom';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {IonicStorageModule} from '@ionic/storage';
import {FCM} from '@ionic-native/fcm';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import {MyApp} from './app.component';
import {ParamsComponent} from '../components/params/params';
import {MdChartComponent} from '../components/md-chart/md-chart';
import {HttpCompComponent} from '../components/http-comp/http-comp';
import {OldParamsComponent} from '../components/old-params/old-params';
import {MdChartPrevComponent} from '../components/md-chart-prev/md-chart-prev';
// import {MonthChartComponent} from '../components/month-chart/month-chart';
import {HistDetailComponent} from '../components/hist-detail/hist-detail';
import {ActiveAlarmControlComponent} from '../components/active-alarm-control/active-alarm-control';
import {AlarmHistoryComponent} from '../components/alarm-history/alarm-history';
import {Push} from '@ionic-native/push';
import {HomePage} from '../pages/home/home';
import {SwipeTabsPage} from '../pages/swipe-tabs/swipe-tabs';
import {LeftPanelPage} from '../pages/left-panel/left-panel';
// import {RightPanelPage} from '../pages/right-panel/right-panel';
import {HistChartPage} from '../pages/hist-chart/hist-chart';
import {WelcomeScreenPage} from '../pages/welcome-screen/welcome-screen';
import {AlarmControlPage} from '../pages/alarm-control/alarm-control';
import {BudgetPage} from '../pages/budget/budget';
import {BillHistoryCompComponent} from '../components/bill-history-comp/bill-history-comp';
import {BillPayPage} from '../pages/bill-pay/bill-pay';
import {BillThreeMoChartComponent} from '../components/bill-three-mo-chart/bill-three-mo-chart';
import {BillParamsComponent} from '../components/bill-params/bill-params';

import {IonicPageModule} from 'ionic-angular';
import {ComponentSummaryPage} from '../pages/component-summary/component-summary';
import {DayCompSummaryPage} from '../pages/day-comp-summary/day-comp-summary';
import {MainOptionsPage} from '../pages/main-options/main-options';
import {SwipeTabsMinPage} from '../pages/swipe-tabs-min/swipe-tabs-min';
import {LeftPanelMinPage} from '../pages/left-panel-min/left-page-min';
import {RightPanelMinPage} from '../pages/right-panel-min/right-panel-min';
import {HomeMinPage} from '../pages/home-min/home-min';
import {ParamsMinComponent} from "../components/params-min/params";
// import {MdChartMinComponent} from "../components/md-chart-min/md-chart";
import {MonthChartMinComponent} from "../components/month-chart-min/month-chart";
import {OldParamsMinComponent} from "../components/old-params-min/old-params";
import {NoInternet} from "../components/no-internet/no-internet";
import {Network} from '@ionic-native/network';
import {CustomerPreMonthValue} from "./shared/customerValues.model";
import {PreMonthSummaryPage} from "../pages/pre-month-summary/pre-month-summary";
import {ComponentFilterPipe} from '../pipes/component-filter/component-filter';
import {LoginPage} from "../pages/login/login";
import {AngularFireModule} from "angularfire2";
import {FIREBASE_CONFIG} from "./app.firebase.config";
import {AngularFireAuth} from "angularfire2/auth";
import {ResetPasswordPage} from "../pages/reset-password/reset-password";
import {PhoneSignupPage} from "../pages/phone-signup/phone-signup";
import {EmailSignupPage} from "../pages/email-signup/email-signup";
import {VerifyPhoneOtpPage} from "../pages/verify-phone-otp/verify-phone-otp";
import {AngularFireDatabase, AngularFireDatabaseModule} from "angularfire2/database";
import {SecureStorage} from "@ionic-native/secure-storage";
import {AuthService} from "./services/auth.service";
import {MonthChartComponent} from '../components/month-chart/month-chart';
import {DayChartComponent} from '../components/day-chart/day-chart';
import {DaySummaryChartPage} from "../pages/day-summary-chart/day-summary-chart";
import {SlidesDayChartsPage} from "../pages/slides-day-charts/slides-day-charts";
import {DayInletChartComponent} from '../components/day-inlet-chart/day-inlet-chart';
import {HourSummaryChartPage} from "../pages/hour-summary-chart/hour-summary-chart";
import {HourChartComponent} from '../components/hour-chart/hour-chart';
import {SupportPage} from "../pages/support/support";
import {SettingPage} from "../pages/setting/setting";
import {AboutPage} from "../pages/about/about";
import {ProfilePage} from "../pages/profile/profile";
import {AlterEmailPage} from "../pages/alter-email/alter-email";
import {VerifyEmailPage} from "../pages/verify-email/verify-email";
import {AlterPasswordPage} from "../pages/alter-password/alter-password";
import {DeleteAccountPage} from "../pages/delete-account/delete-account";
import { PreMonthChartComponent } from '../components/pre-month-chart/pre-month-chart';
import { MonthInletChartComponent } from '../components/month-inlet-chart/month-inlet-chart';
import {EmailComposer} from "@ionic-native/email-composer";
import {ReAuthenticatePage} from "../pages/re-authenticate/re-authenticate";
import { NetworkInterface } from '@ionic-native/network-interface';
import {SignupUidPage} from "../pages/signup-uid/signup-uid";
import {SignupNamePage} from "../pages/signup-name/signup-name";
import {SignupEmailPage} from "../pages/signup-email/signup-email";
import {SignupHousedetailsPage} from "../pages/signup-housedetails/signup-housedetails";
import {SignupMobilePage} from "../pages/signup-mobile/signup-mobile";
import {ScanpagePage} from "../pages/scanpage/scanpage";
// import {MdChartPrevMinComponent} from "../components/md-chart-prev-min/md-chart-prev";


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'c237f227',
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SwipeTabsPage,
    LeftPanelPage,
    // RightPanelPage,
    HistChartPage,
    AlarmControlPage,
    WelcomeScreenPage,
    ComponentSummaryPage,
    DayCompSummaryPage,
    BudgetPage,
    BillPayPage,
    MainOptionsPage,
    SwipeTabsMinPage,
    LeftPanelMinPage,
    RightPanelMinPage,
    HomeMinPage,
    ParamsComponent,
    MdChartComponent,
    HttpCompComponent,
    OldParamsComponent,
    MdChartPrevComponent,
    // MonthChartComponent,
    HistDetailComponent,
    ActiveAlarmControlComponent,
    AlarmHistoryComponent,
    BillHistoryCompComponent,
    BillThreeMoChartComponent,
    BillParamsComponent,
    //Mintix
    ParamsMinComponent,
    // MdChartMinComponent,
    MonthChartMinComponent,
    OldParamsMinComponent,
    // MdChartPrevMinComponent
    NoInternet,
    PreMonthSummaryPage,
    ComponentFilterPipe,
    LoginPage,
    ResetPasswordPage,
    PhoneSignupPage,
    VerifyPhoneOtpPage,
    MonthChartComponent,
    DayChartComponent,
    DaySummaryChartPage,
    SlidesDayChartsPage,
    DayInletChartComponent,
    HourSummaryChartPage,
    HourChartComponent,
    SupportPage,
    SettingPage,
    AboutPage,
    ProfilePage,
    AlterEmailPage,
    VerifyEmailPage,
    AlterPasswordPage,
    DeleteAccountPage,
    PreMonthChartComponent,
    MonthInletChartComponent,
    ReAuthenticatePage,
    LeftPanelPage,
    SignupUidPage,
    SignupNamePage,
    SignupEmailPage,
    SignupHousedetailsPage,
    SignupMobilePage,
    ScanpagePage
  ],

  imports: [
    BrowserModule,
    ChartsModule,
    HttpModule,
    RoundProgressModule,
    CloudModule.forRoot(cloudSettings),
    IonicModule.forRoot(MyApp,{scrollAssist: true,
      autoFocusAssist: true}),
    IonicPageModule.forChild(SwipeTabsPage),
    IonicStorageModule.forRoot(
      // {
      // name: 'vqdb',
      // driverOrder: ['indexeddb', 'sqlite', 'websql']
      // }
    ),

    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AlarmControlPage,
    SwipeTabsPage,
    ComponentSummaryPage,
    DayCompSummaryPage,
    MainOptionsPage,
    BudgetPage,
    BillPayPage,
    PreMonthSummaryPage,
    LoginPage,
    ResetPasswordPage,
    PhoneSignupPage,
    SettingPage,
    ProfilePage,
    VerifyEmailPage,
    VerifyPhoneOtpPage,
    AlterPasswordPage,
    DeleteAccountPage,
    DaySummaryChartPage,
    ReAuthenticatePage,
    LeftPanelPage,
    SignupUidPage,
    SignupNamePage,
    SignupEmailPage,
    SignupHousedetailsPage,
    SignupMobilePage,
    ScanpagePage
    // PreMonthChartComponent,
    // MonthInletChartComponent,
    // MonthChartComponent,
    // DayChartComponent,
    // SlidesDayChartsPage,
    // DayInletChartComponent,
    // HourSummaryChartPage,
    // HourChartComponent,
    // SupportPage,
    // AlterEmailPage,
    // AboutPage,
  ],

  providers: [
    StatusBar,
    SplashScreen,
    MessageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AngularFireDatabase,
    SecureStorage,
    AuthService,
    FCM,
    EmailComposer,
    NetworkInterface,
    QRScanner
    ]

})

export class AppModule {
}
