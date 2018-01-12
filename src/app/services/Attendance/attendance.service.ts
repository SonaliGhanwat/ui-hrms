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
  holidayCreateUrl = "http://localhost:8085/HRMS/holiday/create";
  holidayDeleteUrl = "http://localhost:8085/HRMS/holiday/delete/";
  holidaygetById ="http://localhost:8085/HRMS/holiday/";
  holidayUpdateUrl = "http://localhost:8085/HRMS/holiday/update"
  
  constructor(private http: Http) { }
  
  getAllAttendance(): Observable<Attendance[]> {
    return this.http.get(this.allAttendanceListUrl)
      .map(this.extractData)
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
