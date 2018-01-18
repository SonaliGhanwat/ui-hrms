import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Leave} from '../../models/Leave/Leave.model';
import { BaseService } from '../base.service';
@Injectable()
export class LeaveService extends BaseService{

  allLeaveListUrl = "employeeleave/list";
  leaveCreateUrl = "employeeleave/create";
  leaveDeleteUrl = "employeeleave/delete/";
  leavegetById ="employeeleave/";
  leaveUpdateUrl = "employeeleave/update"
  
  constructor(protected http: Http) {
    super(http);
  }
  
  getAllLeave(): Observable<Leave[]> {
    return this.http.get(this.buidURL(this.allLeaveListUrl))
      .map(this.extractData)
      .catch(this.handleError);
  }

  createLeave(leave: Leave): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.leaveCreateUrl), leave, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteLeaveById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.buidURL(this.leaveDeleteUrl+id))
      .map(success => success.status)
      .catch(this.handleError);
  }
  getLeaveById(id: string): Observable<Leave> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.leavegetById+id))
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateLeave(leave: Leave):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.buidURL(this.leaveUpdateUrl), leave, options)
                 .map(success => success.status)
                 .catch(this.handleError);
      }

  protected extractData(res: Response) {
    let body = res.json();
    return body;
  }
  protected handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
