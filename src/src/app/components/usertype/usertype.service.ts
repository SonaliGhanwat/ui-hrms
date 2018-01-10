import { Injectable } from '@angular/core';

import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserType} from './usertype';
@Injectable()
export class UsertypeService {

  allUserTypeUrl =  "http://localhost:8085/HRMS/usertype/list";
  usertypeUrl = "http://localhost:8085/HRMS/usertype/create";
  constructor(private http:Http) { }

  getAllUserTypes(): Observable<UserType[]>{
    return this.http.get(this.allUserTypeUrl)
    .map(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
          return body;
      }
      private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
      }
}


