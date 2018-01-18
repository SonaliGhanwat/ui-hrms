import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Attendance } from '../../models/Attendance/Attendance.model';
import { BaseService } from '../base.service';
@Injectable()
export class AttendanceService extends BaseService {

  allAttendanceListUrl = "employeeattendance/list";
  attendanceCreateUrl = "employeeattendance/create";
  attendanceDeleteUrl = "employeeattendance/delete/";
  attendancegetById = "employeeattendance/";
  attendanceUpdateUrl = "employeeattendance/update"

  constructor(protected http: Http) {
    super(http);
  }

  getAllAttendance(): Observable<Attendance[]> {
    return this.http.get(this.buidURL(this.allAttendanceListUrl))
      .map(this.extractData)
      .catch(this.handleError);
  }

  createEmployeeAttendance(attendance: Attendance): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.attendanceCreateUrl), attendance, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteEmployeeAttendanceById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.buidURL(this.attendanceDeleteUrl + id))
      .map(success => success.status)
      .catch(this.handleError);
  }
  getEmployeeAttendanceById(id: string): Observable<Attendance> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.attendancegetById + id))
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateEmployeeAttendance(attendance: Attendance): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.attendanceUpdateUrl, attendance, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

}
