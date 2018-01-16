import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Leave} from '../../models/Leave/Leave.model';
@Injectable()
export class LeaveService {

  allLeaveListUrl = "http://localhost:8085/HRMS/employeeleave/list";
  leaveCreateUrl = "http://localhost:8085/HRMS/employeeleave/create";
  leaveDeleteUrl = "http://localhost:8085/HRMS/employeeleave/delete/";
  leavegetById ="http://localhost:8085/HRMS/employeeleave/";
  leaveUpdateUrl = "http://localhost:8085/HRMS/employeeleave/update"
  
  constructor(private http: Http) { }
  
  getAllLeave(): Observable<Leave[]> {
    return this.http.get(this.allLeaveListUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createLeave(leave: Leave): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.leaveCreateUrl, leave, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteLeaveById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.leaveDeleteUrl+id)
      .map(success => success.status)
      .catch(this.handleError);
  }
  getLeaveById(id: string): Observable<Leave> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.leavegetById+id)
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateLeave(leave: Leave):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.leaveUpdateUrl, leave, options)
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
