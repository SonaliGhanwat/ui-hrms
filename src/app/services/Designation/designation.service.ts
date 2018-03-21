import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Designation } from '../../models/designation/Designation.model';
import { BaseService } from '../base.service';
@Injectable()
export class DesignationService extends BaseService {
  designationUrl = 'designation/';
  constructor(protected http: Http) {
    super(http);
  }
  getAllDesignationList(): Observable<Designation[]> {
    return this.http.get(this.buidURL(this.designationUrl + this.list_url))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createDesignation(designation: Designation): Observable<any> {
    return this.http.post(this.buidURL(this.designationUrl + this.create_url), designation)
      .map(success => success.json())
      .catch(this.handleError);
  }
  deleteDesignationById(id: string): Observable<any> {
    return this.http.delete(this.buidURL(this.designationUrl + this.delete_url + id))
      .map(success => success.json())
      .catch(this.handleError);
  }
  getDesignationById(id: string): Observable<Designation> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const cpParams = new URLSearchParams();
    cpParams.set('id', id);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.designationUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateDesignation(designation: Designation): Observable<any> {
    return this.http.put(this.buidURL(this.designationUrl + this.update_url), designation)
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



