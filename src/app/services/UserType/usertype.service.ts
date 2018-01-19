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

 
  usertypeUrl = "usertype/";
 

  constructor(protected http: Http) {
    super(http);
  }

  getAllUserTypes(): Observable<UserType[]> {
    return this.http.get(this.buidURL(this.usertypeUrl+this.list_url))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createUserType(userType: UserType): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.usertypeUrl+this.create_url), userType, options)
      .map(success => success)
      .catch(this.handleError);
  }

  deleteUserTypeById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.buidURL(this.usertypeUrl+this.delete_url+id))
      .map(success => success.status)
      .catch(this.handleError);
  }
  getUserTypeById(id: string): Observable<UserType> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.usertypeUrl+id))
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateUserType(userType: UserType):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.buidURL(this.usertypeUrl+this.update_url), userType, options)
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


