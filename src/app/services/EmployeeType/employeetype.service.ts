import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EmployeeType } from '../../models/EmployeeType/EmployeeType.model';
import { BaseService } from '../base.service';

@Injectable()
export class EmployeetypeService extends BaseService {
  employeeTypeUrl = 'employeetype/';
  constructor(protected http: Http) {
    super(http);
  }
  getAllEmployeeTypeList(): Observable<EmployeeType[]> {
    return this.http.get(this.buidURL(this.employeeTypeUrl + this.list_url))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createEmployeeType(employeeType: EmployeeType): Observable<any> {
    return this.http.post(this.buidURL(this.employeeTypeUrl + this.create_url), employeeType)
      .map(success => success.json())
      .catch(this.handleError);
  }
  deleteEmployeeTypeById(id: string): Observable<any> {
    return this.http.delete(this.buidURL(this.employeeTypeUrl + this.delete_url + id))
      .map(success => success.json())
      .catch(this.handleError);
  }
  getEmployeeTypeById(id: string): Observable<EmployeeType> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const cpParams = new URLSearchParams();
    cpParams.set('id', id);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.employeeTypeUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateEmployeeType(employeeType: EmployeeType): Observable<any> {
    return this.http.put(this.buidURL(this.employeeTypeUrl + this.update_url), employeeType)
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
