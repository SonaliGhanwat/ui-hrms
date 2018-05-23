import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Leave } from '../../models/Leave/Leave.model';
import { Approval } from '../../models/Approvals/Approval.model';
import { BaseService } from '../base.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppDataService } from '../../services/app-data/app-data.service';
@Injectable()
export class ApprovalsService extends BaseService {
  leaveUrl = 'employeeleave/getEmployeeLeaveByStatus/';
  updateStatus = 'employeeleave/statusUpdate';
  regularizationUrl = 'regularization/getRegularizationByStatus/';
  updateRegularizatStatus = 'regularization/regularizationStatusUpdate';
  projectUrl = 'project/getProjectByStatus/';
  projectStatusUpdate = 'project/projectStatusUpdate';
  myCookie: any;
  constructor(protected http: Http,private appData: AppDataService) {
    super(http);
  }
  getAllLeaveByStatus(): Observable<any> {
    return this.http.get(this.buidURL(this.leaveUrl + this.appData.getUserId()))
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateLeaveStatus(approval: Approval): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.updateStatus), approval,options)
      .map(success => success.json())
      .catch(this.handleError);
  }

  getAllRegularizationByStatus(): Observable<any> {
    return this.http.get(this.buidURL(this.regularizationUrl + this.appData.getUserId()))
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateRegularizationStatus(approval: Approval): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.updateRegularizatStatus), approval,options)
      .map(success => success.json())
      .catch(this.handleError);
  }
  getAllProjectByStatus(): Observable<any> {
    return this.http.get(this.buidURL(this.projectUrl + this.appData.getUserId()))
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateProjctStatus(approval: Approval): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.projectStatusUpdate), approval,options)
      .map(success => success.json())
      .catch(this.handleError);
  }
  protected extractData(res: Response) {
    const body = res.json();
    console.log('data:', body);
    return body || [];
  }
  protected handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
