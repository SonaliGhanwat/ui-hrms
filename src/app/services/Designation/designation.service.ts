import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Designation } from '../../models/designation/Designation.model';
@Injectable()
export class DesignationService {
  allDesignationListUrl = "http://localhost:8085/HRMS/designation/list";
  designationCreateUrl = "http://localhost:8085/HRMS/designation/create";
  designationDeleteUrl = "http://localhost:8085/HRMS/designation/delete/";
  designationgetById ="http://localhost:8085/HRMS/designation/";
  designationUpdateUrl = "http://localhost:8085/HRMS/designation/update"
 
  constructor(private http: Http) { }
  
  getAllDesignationList(): Observable<Designation[]> {
    return this.http.get(this.allDesignationListUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  createDesignation(designation: Designation): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.designationCreateUrl, designation, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteDesignationById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.designationDeleteUrl+id)
      .map(success => success.status)
      .catch(this.handleError);
  }
  getDesignationById(id: string): Observable<Designation> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.designationgetById+id)
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateDesignation(designation: Designation):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.designationUpdateUrl, designation, options)
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



