import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Attendance} from '../../models/Attendance/Attendance.model';
@Injectable()
export class AttendanceService {

  allAttendanceListUrl = "http://localhost:8085/HRMS/employeeattendance/list";
  attendanceCreateUrl = "http://localhost:8085/HRMS/employeeattendance/create";
  attendanceDeleteUrl = "http://localhost:8085/HRMS/employeeattendance/delete/";
  attendancegetById ="http://localhost:8085/HRMS/employeeattendance/";
  attendanceUpdateUrl = "http://localhost:8085/HRMS/employeeattendance/update"
  
  constructor(private http: Http) { }
  
  getAllAttendance(): Observable<Attendance[]> {
    return this.http.get(this.allAttendanceListUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createEmployeeAttendance(attendance: Attendance): Observable<any> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.attendanceCreateUrl, attendance, options)
      .map(success => success)
      .catch(this.handleError);
      
  }

  deleteEmployeeAttendanceById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.attendanceDeleteUrl+id)
      .map(success => success.status)
      .catch(this.handleError);
  }
  getEmployeeAttendanceById(id: string): Observable<Attendance> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.attendancegetById+id)
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateEmployeeAttendance(attendance: Attendance):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.attendanceUpdateUrl, attendance, options)
                 .map(success => success.status)
                 .catch(this.handleError);
                 
      }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
  
}
