import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Employee } from '../../models/Employee/Employee.model';

@Injectable()
export class EmployeeService {

  allEmployeeListUrl = "http://localhost:8085/HRMS/employee/list";
  employeeCreateUrl = "http://localhost:8085/HRMS/employee/create";
  employeeDeleteUrl = "http://localhost:8085/HRMS/employee/delete/";
  employeegetById ="http://localhost:8085/HRMS/employee/";
  employeeeUpdateUrl = "http://localhost:8085/HRMS/employee/update"
  reportTo="http://localhost:8085/HRMS/designation/reportTo/"
 
  constructor(private http: Http) { }
  
  getAllEmployeeList(): Observable<Employee[]> {
    return this.http.get(this.allEmployeeListUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  createEmployee(employee: Employee): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.employeeCreateUrl, employee, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteEmployeeById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.employeeDeleteUrl+id)
      .map(success => success.status)
      .catch(this.handleError);
  }
  employeeForReportTo(id: number): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(this.reportTo+id)
    .map(this.extractData)
    .catch(this.handleError);
  }
  getEmployeeById(id: string): Observable<Employee> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.employeegetById+id)
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateEmployee(employee: Employee):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.employeeeUpdateUrl, employee, options)
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
