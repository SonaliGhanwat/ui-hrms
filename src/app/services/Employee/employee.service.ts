import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions,RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Employee } from '../../models/Employee/Employee.model';
import { BaseService } from '../base.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable()
export class EmployeeService extends BaseService {
  employeeUrl = 'employee/';
  reportTo = 'http://localhost:8085/HRMS/designation/reportTo/';
  list_url = 'list';
  myCookie: any;
  constructor(protected http: Http) {
    super(http);
  }
  getAllEmployeeList(): Observable<Employee[]> {
    this.myCookie = Cookie.get('cookieName');
    // console.log('cookie:', this.myCookie);
    /*let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', "*");
    headers.append("Access-Control-Allow-Headers", "*");
    let options = new RequestOptions({headers:headers ,withCredentials: true });
    console.log('options:',options)*/
    return this.http.get(this.buidURL(this.employeeUrl + this.list_url))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.buidURL(this.employeeUrl + this.create_url), employee)
      .map(success => success.json())
      .catch(this.handleError);
  }
  deleteEmployeeById(id: string): Observable<any> {
    return this.http.delete(this.buidURL(this.employeeUrl + this.delete_url + id))
      .map(success => success.json())
      .catch(this.handleError);
  }
  employeeForReportTo(id: number): Observable<any> {
    return this.http.get(this.reportTo + id)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getEmployeeById(id: string): Observable<Employee> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const cpParams = new URLSearchParams();
    cpParams.set('id', id);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.employeeUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(this.buidURL(this.employeeUrl + this.update_url), employee)
      .map(success => success.json())
      .catch(this.handleError);
  }

  protected extractData(res: Response) {
    const body = res.json();
    // console.log('body:', body);
    return body;
  }
  protected handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
  private getRequestOptions() {
    const myCookie = Cookie.get('cookieName');
    // console.log('cookie:', myCookie);
    const customHeaders: Headers = new Headers();

    customHeaders.append('request', myCookie);
    customHeaders.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    customHeaders.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    customHeaders.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    customHeaders.append('Access-Control-Allow-Credentials', 'true');
    console.log('customHeaders:', customHeaders);
    return new RequestOptions({ headers: customHeaders, withCredentials: true });
  }
  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
        options = new RequestOptions();
    }
    if (options.headers == null) {
        options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');

    return options;
}

}
