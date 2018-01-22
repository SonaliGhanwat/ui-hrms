import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { LoginModel } from '../../models/login/login.model';
@Injectable()
export class LoginService {
  loginUrl = "http://localhost:8085/HRMS/employee/login";

  constructor(private http:Http) { }

post(login: LoginModel):Observable<any> {
	let Headers1 = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: Headers1 });
        return this.http.post(this.loginUrl, login,options)
               .map(success => success.json())
               .catch(this.handleError);
               
               
    }

    private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }

}
