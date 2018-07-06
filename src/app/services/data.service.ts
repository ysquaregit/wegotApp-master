import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {

  private AUTHSubject = new Subject<any>();
  private DTSubject = new Subject<any>();
  private BBSubject = new Subject<any>();
  private CBSubject = new Subject<any>();
  private CCSubject = new Subject<any>();
  private MoToSubject = new Subject<any>();
  private PMCSubject = new Subject<any>();
  private PMoToSubject = new Subject<any>();
  private PRPSubject = new Subject<any>();
  private RPSubject = new Subject<any>();
  private PBSubject = new Subject<any>();
  private BHSubject = new Subject<any>();
  private ALSubject = new Subject<any>();


  private MDCSubject = new Subject<any>();
  private MHCSubject = new Subject<any>();
  private MHDCSubject = new Subject<any>();
  private MAHSubject = new Subject<any>();
  private PMChartSubject = new Subject<any>();
  private TMCChartSubject = new Subject<any>();
  private DAYCOMPSubject = new Subject<any>();
  private MoChInletSubject = new Subject<any>();
  private MoToChartSubject = new Subject<any>();
  private PreMoToChartSubject = new Subject<any>();
  private AACSubject = new Subject<any>();

  //auth-token
  sendauthToken(auth_token: any) {
    this.AUTHSubject.next({auth_token: auth_token});
  }

  getauthToken(): Observable<any> {
    return this.AUTHSubject.asObservable();
  }

//auth-token

  //daytotal
  senddayTotal(ven_dayTotal: number) {
    this.DTSubject.next({ven_dayTotal: ven_dayTotal});
  }

  getDaytotal(): Observable<any> {
    return this.DTSubject.asObservable();
  }

//daytotal


//month total
  sendMonthTotal(ven_month_total: number) {
    this.MoToSubject.next({ven_month_total: ven_month_total});
  }

  getMonthtotal(): Observable<any> {
    return this.MoToSubject.asObservable();
  }

//month total


  //ven_balancebudget
  sendven_balancebudget(ven_balancebudget: number) {
    this.BBSubject.next({ven_balancebudget: ven_balancebudget});
  }

  getven_balancebudget(): Observable<any> {
    return this.BBSubject.asObservable();
  }

//ven_balancebudget


  //ven_cur_budget
  sendven_cur_budget(ven_cur_budget: number) {
    this.CBSubject.next({ven_cur_budget: ven_cur_budget});
  }

  getven_cur_budget(): Observable<any> {
    return this.CBSubject.asObservable();
  }

//ven_cur_budget


  //ven_cur_cost
  sendven_cur_cost(ven_cur_cost: number) {
    this.CCSubject.next({ven_cur_cost: ven_cur_cost});
  }

  getven_cur_cost(): Observable<any> {
    return this.CCSubject.asObservable();
  }

//ven_cur_cost


  //ven_prev_month_cost
  sendven_prev_month_cost(ven_prev_month_cost: number) {
    this.PMCSubject.next({ven_prev_month_cost: ven_prev_month_cost});
  }

  getven_prev_month_cost(): Observable<any> {
    return this.PMCSubject.asObservable();
  }

//ven_prev_month_cost


  //ven_prev_month_total
  sendven_prev_month_total(ven_prev_month_total: number) {
    this.PMoToSubject.next({ven_prev_month_total: ven_prev_month_total});
  }

  getven_prev_month_total(): Observable<any> {
    return this.PMoToSubject.asObservable();
  }

//ven_prev_month_total


  //ven_prev_rp
  sendven_prev_rp(ven_prev_rp: number) {
    this.PRPSubject.next({ven_prev_rp: ven_prev_rp});
  }

  getven_prev_rp(): Observable<any> {
    return this.PRPSubject.asObservable();
  }

//ven_prev_rp


  //ven_rp
  sendven_rp(ven_rp: number) {
    this.RPSubject.next({ven_rp: ven_rp});
  }

  getven_rp(): Observable<any> {
    return this.RPSubject.asObservable();
  }

//ven_rp


  //ven_prev_month_total
  sendven_prev_budget(ven_prev_budget: number) {
    this.PBSubject.next({ven_prev_budget: ven_prev_budget});
  }

  getven_prev_budget(): Observable<any> {
    return this.PBSubject.asObservable();
  }

//ven_prev_month_total


  clearMessage() {
    // this.subject.next();
  }


  sendMDChartArray(mdchart: any[]) {
    this.MDCSubject.next({mdchart: mdchart});
  }


  getMDChartArray(): Observable<any> {
    return this.MDCSubject.asObservable();
  }


//month historical Chart

  sendMHChartArray(mhchart: any[]) {
    this.MHCSubject.next({mhochart: mhchart});
  }


  getMHChartArray(): Observable<any> {
    return this.MHCSubject.asObservable();
  }

  //month historical chart


  //month historical Detail Chart

  sendMHDChartArray(mhdchart: any[]) {
    this.MHDCSubject.next({mhodchart: mhdchart});
  }


  getMHDChartArray(): Observable<any> {
    return this.MHDCSubject.asObservable();
  }

  //month historical Detail chart

  //active alarm control

  sendAACArray(aacarray: any[]) {
    this.AACSubject.next({aacarray: aacarray});
  }

  getAACArray(): Observable<any> {
    return this.AACSubject.asObservable();
  }


  //active alarm control


  //month Alarm History

  sendMAHArray(maharray: any[]) {
    this.MAHSubject.next({maharray: maharray});
  }


  getMAHArray(): Observable<any> {
    return this.MAHSubject.asObservable();
  }

  //month Alarm History


  //month day  Chart

  sendPMChartArray(pmchart: any[]) {
    this.PMChartSubject.next({pmchart: pmchart});
  }


  getPMChartArray(): Observable<any> {
    return this.PMChartSubject.asObservable();
  }

  //month day chart


  //Three month cost Chart

  sendTMCChartArray(tmcchart: any[]) {
    this.TMCChartSubject.next({tmcchart: tmcchart});
  }


  getTMCChartArray(): Observable<any> {
    return this.TMCChartSubject.asObservable();
  }

  //Three month cost Chart


  //Bill history

  sendBHArray(bhdata: any[]) {
    this.BHSubject.next({bhdata: bhdata});
  }


  getBHtArray(): Observable<any> {
    return this.BHSubject.asObservable();
  }

  //alarms count

  sendALCount(aldata: any[]) {
    this.ALSubject.next({alarms: aldata});
  }

  getALCount(): Observable<any> {
    return this.ALSubject.asObservable();
  }

  //Day comp summary
  sendDayCompSummary(daycompdata: any[]) {
    this.DAYCOMPSubject.next({daycompdata: daycompdata});
  }

  getDayCompSummary(): Observable<any> {
    return this.DAYCOMPSubject.asObservable();
  }

  //Month chart inletwise

  sendMonthChartInletwise(monChInlet: any[]) {
    this.MoChInletSubject.next({monChInlet: monChInlet});
  }

  getMonthChartInletwise(): Observable<any> {
    return this.MoChInletSubject.asObservable();
  }

  //Month total chart

  sendMonthTotalChart(moToChart: any[]) {
    this.MoToChartSubject.next({moToChart: moToChart});
  }

  getMonthTotalChart(): Observable<any> {
    return this.MoToChartSubject.asObservable();
  }

  //Previous month total chart
  sendPreMonthTotalChart(preMoToChart: any[]) {
    this.PreMoToChartSubject.next({preMoToChart: preMoToChart});
  }

  getPreMonthTotalChart(): Observable<any> {
    return this.PreMoToChartSubject.asObservable();
  }


}
