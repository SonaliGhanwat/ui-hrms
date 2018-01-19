import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { LeaveType } from '../../models/LeaveType/Leavetype.model'
import { BaseService } from '../base.service';
@Injectable()
export class LeavetypeService extends BaseService {

  leaveTypeUrl = "leavetype/";


  constructor(protected http: Http) {
    super(http);
  }
  getAllLeaveTypeList(): Observable<LeaveType[]> {
    return this.http.get(this.buidURL(this.leaveTypeUrl + this.list_url))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createLeaveType(leaveType: LeaveType): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.leaveTypeUrl + this.create_url), leaveType, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteLeaveType(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.buidURL(this.leaveTypeUrl + this.delete_url + id))
      .map(success => success.status)
      .catch(this.handleError);
  }
  getLeaveTypeById(id: string): Observable<LeaveType> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.leaveTypeUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateLeaveType(leaveType: LeaveType): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.put(this.buidURL(this.leaveTypeUrl + this.update_url), leaveType, options)
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





