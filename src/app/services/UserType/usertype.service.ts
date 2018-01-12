import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserType } from '../../models/UserType/UserType.model';

@Injectable()
export class UsertypeService {

  allUserTypeUrl = "http://localhost:8085/HRMS/usertype/list";
  usertypeUrl = "http://localhost:8085/HRMS/usertype/create";
  usertypeDeleteUrl = "http://localhost:8085/HRMS/usertype/delete/";
  UserTypegetById ="http://localhost:8085/HRMS/usertype/";
  usertypeUpdateUrl = "http://localhost:8085/HRMS/usertype/update"
  constructor(private http: Http) { }

  getAllUserTypes(): Observable<UserType[]> {
    return this.http.get(this.allUserTypeUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  createUserType(userType: UserType): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.usertypeUrl, userType, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteUserTypeById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.usertypeDeleteUrl+id)
      .map(success => success.status)
      .catch(this.handleError);
  }
  getUserTypeById(id: string): Observable<UserType> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.UserTypegetById+id)
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateUserType(userType: UserType):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.usertypeUpdateUrl, userType, options)
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


