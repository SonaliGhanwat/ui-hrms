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
  usertypeUrl = 'usertype/';
  constructor (protected http: Http) {
    super(http);
  }

  getAllUserTypes(): Observable<UserType[]> {
    return this.http.get (this.buidURL(this.usertypeUrl + this.list_url))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createUserType(userType: UserType): Observable<any> {
    return this.http.post (this.buidURL (this.usertypeUrl + this.create_url), userType)
      .map(success => success.json())
      .catch(this.handleError);
  }

  deleteUserTypeById(id: string): Observable<any> {
    return this.http.delete (this.buidURL (this.usertypeUrl + this.delete_url + id))
      .map(success => success.json())
      .catch(this.handleError);
  }
  getUserTypeById(id: string): Observable<UserType> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const cpParams = new URLSearchParams();
    cpParams.set('id', id);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.usertypeUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateUserType(userType: UserType): Observable<any> {
    return this.http.put(this.buidURL(this.usertypeUrl + this.update_url), userType)
      .map(success => success.json())
      .catch(this.handleError);
  }
  protected extractData(res: Response) {
    const body = res.json();
    return body;
  }
  protected handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}


