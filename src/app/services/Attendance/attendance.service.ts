import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Attendance } from '../../models/Attendance/Attendance.model';
import { EmployeeAttendancePart } from '../../models/AttendanceMultipale/CreateMultipale.model';
import { BaseService } from '../base.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppDataService } from '../../services/app-data/app-data.service';
@Injectable()
export class AttendanceService extends BaseService {
  
  attendanceUrl = 'employeeattendance/';
  attendancelist_url = 'list';
  getAttendanceByDate = 'getAttendance/';
  attendanceWorkinfo = 'calculateAttendanceWorkInfo/';
  createMultipale = 'createMultiple';
  myCookie: any;
  constructor(protected http: Http, private appData: AppDataService,) {
    super(http);
  }
  getAllAttendance(): Observable<Attendance[]> {
    return this.http.get(this.buidURL(this.attendanceUrl + this.attendancelist_url))
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
  getAllAttendanceBYDate(date:Date): Observable<any> {
    return this.http.get(this.buidURL(this.attendanceUrl + this.getAttendanceByDate+this.appData.getUserId()+'/'+date))
      .map(this.extractData)
      .catch(this.handleError);
  }
  calculateAttendanceWork(date:Date): Observable<any> {
    return this.http.get(this.buidURL(this.attendanceUrl + this.attendanceWorkinfo+this.appData.getUserId()+'/'+date))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createMultipaleEmployeeAttendance(attendance: EmployeeAttendancePart): Observable<any> {
    return this.http.post(this.buidURL(this.attendanceUrl + this.createMultipale), attendance)
      .map(success => success.json())
      .catch(this.handleError);
  }
  protected extractData(res: Response) {
    const body = res.json();
    // console.log('body:', body);
    return body;
  }
  protected handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
