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
  attendanceUrl = 'employeeattendance/';
  attendancelist_url = 'list/';
  myCookie: any;
  constructor(protected http: Http) {
    super(http);
  }
  getAllAttendance(): Observable<Attendance[]> {
    this.myCookie = Cookie.get('cookieName');
    return this.http.get(this.buidURL(this.attendanceUrl + this.attendancelist_url + this.myCookie))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createEmployeeAttendance(attendance: Attendance): Observable<any> {
    return this.http.post(this.buidURL(this.attendanceUrl + this.create_url), attendance)
      .map(success => success.json())
      .catch(this.handleError);
  }
  deleteEmployeeAttendanceById(id: string): Observable<any> {
    return this.http.delete(this.buidURL(this.attendanceUrl + this.delete_url + id))
      .map(success => success.json())
      .catch(this.handleError);
  }
  getEmployeeAttendanceById(id: string): Observable<Attendance> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const cpParams = new URLSearchParams();
    cpParams.set('id', id);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.attendanceUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateEmployeeAttendance(attendance: Attendance): Observable<any> {
    return this.http.put(this.buidURL(this.attendanceUrl + this.update_url), attendance)
      .map(success => success.json())
      .catch(this.handleError);
  }
  protected extractData(res: Response) {
    const body = res.json();
    console.log('body:', body);
    return body;
  }
  protected handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
