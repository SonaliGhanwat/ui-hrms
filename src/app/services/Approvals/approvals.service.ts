import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Leave } from '../../models/Leave/Leave.model';
import { Approval } from '../../models/Approvals/Approval.model';
import { BaseService } from '../base.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable()
export class ApprovalsService extends BaseService {
  leaveUrl = 'employeeleave/getEmployeeLeaveByStatus/';
  updateStatus = 'employeeleave/statusUpdate';
  myCookie: any;
  constructor(protected http: Http) {
    super(http);
  }
  getAllLeaveByStatus(): Observable<any> {
    this.myCookie = Cookie.get('cookieName');
    console.log('cookie:', this.myCookie);
    return this.http.get(this.buidURL(this.leaveUrl + this.myCookie))
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateLeaveStatus(approval: Approval): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.updateStatus), approval,options)
      .map(success => success.json())
      .catch(this.handleError);
  }
  protected extractData(res: Response) {
    const body = res.json();
    console.log('data:', body);
    return body || [];
  }
  protected handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}
