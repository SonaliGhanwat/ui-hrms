import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Employee } from '../../models/Employee/Employee.model';
import { BaseService } from '../base.service';

@Injectable()
export class EmployeeService extends BaseService{

  employeeUrl = "employee/";
 
  reportTo="http://localhost:8085/HRMS/designation/reportTo/"
 
  constructor(protected http: Http) {
    super(http);
  }
  
  getAllEmployeeList(): Observable<Employee[]> {
    return this.http.get(this.buidURL(this.employeeUrl+this.list_url))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createEmployee(employee: Employee): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.employeeUrl+this.create_url), employee, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteEmployeeById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.buidURL(this.employeeUrl+this.delete_url+id))
      .map(success => success.status)
      .catch(this.handleError);
  }
  employeeForReportTo(id: number): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.buidURL(this.reportTo+id))
    .map(this.extractData)
    .catch(this.handleError);
  }
  getEmployeeById(id: string): Observable<Employee> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.employeeUrl+id))
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateEmployee(employee: Employee):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.buidURL(this.employeeUrl+this.update_url), employee, options)
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
