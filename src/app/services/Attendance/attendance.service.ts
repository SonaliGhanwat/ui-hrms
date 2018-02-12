import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Attendance } from '../../models/Attendance/Attendance.model';
import { BaseService } from '../base.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable()
export class AttendanceService extends BaseService {

  attendanceUrl = "employeeattendance/";
  constructor(protected http: Http) {
    super(http);
  }
  getAllAttendance(): Observable<Attendance[]> {
    let myCookie = Cookie.get('url');
    console.log("myCookie:",myCookie);
    return this.http.get(this.buidURL(this.attendanceUrl + this.list_url),myCookie)   
      .map(this.extractData)
      .catch(this.handleError);
  }
  createEmployeeAttendance(attendance: Attendance): Observable<any> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.attendanceUrl + this.create_url), attendance, options)
      .map(success => success.json())
      .catch(this.handleError);
  }

  deleteEmployeeAttendanceById(id: string): Observable<any> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.buidURL(this.attendanceUrl + this.delete_url + id))
      .map(success => success.json())
      .catch(this.handleError);
  }
  getEmployeeAttendanceById(id: string): Observable<Attendance> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.attendanceUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateEmployeeAttendance(attendance: Attendance): Observable<any> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.buidURL(this.attendanceUrl + this.update_url), attendance, options)
      .map(success => success.json())
      .catch(this.handleError);
  }
  protected extractData(res: Response) {
    let body = res.json();
    console.log("body:",body)
    return body;
  }
  protected handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
