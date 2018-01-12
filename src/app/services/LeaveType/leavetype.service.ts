import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LeaveType} from '../../models/LeaveType/Leavetype.model'

@Injectable()
export class LeavetypeService {

  allLeaveTypeListUrl = "http://localhost:8085/HRMS/leavetype/list";
  leaveTypeCreateUrl = "http://localhost:8085/HRMS/leavetype/create";
  leaveTypeDeleteUrl = "http://localhost:8085/HRMS/leavetype/delete/";
  leaveTypegetById ="http://localhost:8085/HRMS/leavetype/";
  leaveTypeUpdateUrl = "http://localhost:8085/HRMS/leavetype/update"
  constructor(private http: Http) { }

  getAllLeaveTypeList(): Observable<LeaveType[]> {
    return this.http.get(this.allLeaveTypeListUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  createLeaveType(leaveType: LeaveType): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.leaveTypeCreateUrl, leaveType, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteLeaveType(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.leaveTypeDeleteUrl+id)
      .map(success => success.status)
      .catch(this.handleError);
  }
  getLeaveTypeById(id: string): Observable<LeaveType> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.leaveTypegetById+id)
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateLeaveType(leaveType: LeaveType):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.leaveTypeUpdateUrl, leaveType, options)
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





