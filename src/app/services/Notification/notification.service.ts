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
export class NotificationService extends BaseService {
  attendanceUrl = 'employeeattendance/getAttendanceforNotification/';
  attendanceStatusUrl = 'employeeattendance/getAttendanceByStatus/';
  taskByUserIdurl = 'employeedailytask/getTaskByUserid/'
  constructor(protected http: Http,private appData: AppDataService) {
    super(http);
  }

  getAllAttendanceByUserId(): Observable<any> {
    return this.http.get(this.buidURL(this.attendanceUrl + this.appData.getUserId()))
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllAttendanceByStatus(): Observable<any> {
    return this.http.get(this.buidURL(this.attendanceStatusUrl + this.appData.getUserId()))
      .map(this.extractData)
      .catch(this.handleError);
  }
  getAlltaskByUserId(): Observable<any> {
    return this.http.get(this.buidURL(this.taskByUserIdurl + this.appData.getUserId()))
      .map(this.extractData)
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
