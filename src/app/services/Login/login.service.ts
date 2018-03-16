import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from '../base.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LoginModel } from '../../models/login/login.model';
@Injectable()
export class LoginService extends BaseService {
  loginUrl = 'employee/login';
  resetPasswordUrl = 'employee/resetpassword';
  constructor(protected http: Http) {
    super(http);
  }
  post(login: LoginModel): Observable<any> {
    return this.http.post(this.buidURL(this.loginUrl), login)
      .map(success => success.json())
      .catch(this.handleError);
  }
  resetPasswordPost(login: LoginModel): Observable<any> {

    return this.http.post(this.buidURL(this.resetPasswordUrl), login)
      .map(success => success.json())
      .catch(this.handleError);
  }
  protected handleError(error: Response | any) {

    return Observable.throw(error.status);
  }
  protected extractData(res: Response) {
    const body = res.json();
    return body;
  }
}
