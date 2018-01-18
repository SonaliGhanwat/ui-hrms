import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserType } from '../../models/UserType/UserType.model';
import { BaseService } from '../base.service';
@Injectable()
export class UsertypeService extends BaseService {

  allUserTypeUrl = "usertype/list";
  usertypeUrl = "usertype/create";
  usertypeDeleteUrl = "usertype/delete/";
  UserTypegetById ="usertype/";
  usertypeUpdateUrl = "usertype/update"

  constructor(protected http: Http) {
    super(http);
  }

  getAllUserTypes(): Observable<UserType[]> {
    return this.http.get(this.buidURL(this.allUserTypeUrl))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createUserType(userType: UserType): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.usertypeUrl), userType, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteUserTypeById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.buidURL(this.usertypeDeleteUrl+id))
      .map(success => success.status)
      .catch(this.handleError);
  }
  getUserTypeById(id: string): Observable<UserType> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.UserTypegetById+id))
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateUserType(userType: UserType):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.buidURL(this.usertypeUpdateUrl), userType, options)
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


