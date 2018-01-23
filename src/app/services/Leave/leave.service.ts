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

  leaveUrl = "employeeleave/";
  
  
  constructor(protected http: Http) {
    super(http);
  }
  
  getAllLeave(): Observable<Leave[]> {
    return this.http.get(this.buidURL(this.leaveUrl+this.list_url))
      .map(this.extractData)
      .catch(this.handleError);
  }

  createLeave(leave: Leave): Observable<any> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.leaveUrl+this.create_url), leave, options)
      .map(success => success.json())
      .catch(this.handleError);
  }

  deleteLeaveById(id: string): Observable<any> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.buidURL(this.leaveUrl+this.delete_url+id))
      .map(success => success.json())
      .catch(this.handleError);
  }
  getLeaveById(id: string): Observable<Leave> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.leaveUrl+id))
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateLeave(leave: Leave):Observable<any> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.buidURL(this.leaveUrl+this.update_url), leave, options)
                 .map(success => success.json())
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
