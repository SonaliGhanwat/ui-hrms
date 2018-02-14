import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Leave} from '../../models/Leave/Leave.model';
import { BaseService } from '../base.service';
@Injectable()
export class ApprovalsService extends BaseService {

  leaveUrl = "employeeleave/getEmployeeLeaveByStatus";
  
  
  constructor(protected http: Http) {
    super(http);
  }
  
  getAllLeaveByStatus(): Observable<Leave[]> {
    return this.http.get(this.buidURL(this.leaveUrl))
      .map(this.extractData)
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
