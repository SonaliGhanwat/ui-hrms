import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Designation } from '../../models/designation/Designation.model';
import { BaseService } from '../base.service';
@Injectable()
export class DesignationService extends BaseService{

  designationUrl= "designation/";
 
 
  constructor(protected http: Http) {
    super(http);
  }
  
  getAllDesignationList(): Observable<Designation[]> {
    return this.http.get(this.buidURL(this.designationUrl+this.list_url))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createDesignation(designation: Designation): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.designationUrl+this.create_url), designation, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteDesignationById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.buidURL(this.designationUrl+this.delete_url+id))
      .map(success => success.status)
      .catch(this.handleError);
  }
  getDesignationById(id: string): Observable<Designation> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.designationUrl+id))
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateDesignation(designation: Designation):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.buidURL(this.designationUrl+this.update_url), designation, options)
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



