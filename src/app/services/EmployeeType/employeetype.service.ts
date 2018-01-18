import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EmployeeType} from '../../models/EmployeeType/EmployeeType.model';
import { BaseService } from '../base.service';

@Injectable()
export class EmployeetypeService extends BaseService{

  allEmployeeTypeListUrl = "employeetype/list";
  employeeTypeCreateUrl = "employeetype/create";
  employeeTypeDeleteUrl = "employeetype/delete/";
  employeeTypegetById ="employeetype/";
  employeeTypeUpdateUrl = "employeetype/update"
 
  constructor(protected http: Http) {
    super(http);
  }
  
  
  getAllEmployeeTypeList(): Observable<EmployeeType[]> {
    return this.http.get(this.buidURL(this.allEmployeeTypeListUrl))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createEmployeeType(employeeType: EmployeeType): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.employeeTypeCreateUrl), employeeType, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteEmployeeTypeById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.buidURL(this.employeeTypeDeleteUrl+id))
      .map(success => success.status)
      .catch(this.handleError);
  }
  getEmployeeTypeById(id: string): Observable<EmployeeType> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.employeeTypegetById+id))
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateEmployeeType(employeeType: EmployeeType):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.buidURL(this.employeeTypeUpdateUrl), employeeType, options)
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
