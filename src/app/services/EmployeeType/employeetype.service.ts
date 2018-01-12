import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EmployeeType} from '../../models/EmployeeType/Employee.model';

@Injectable()
export class EmployeetypeService {

  allEmployeeTypeListUrl = "http://localhost:8085/HRMS/employeetype/list";
  employeeTypeCreateUrl = "http://localhost:8085/HRMS/employeetype/create";
  employeeTypeDeleteUrl = "http://localhost:8085/HRMS/employeetype/delete/";
  employeeTypegetById ="http://localhost:8085/HRMS/employeetype/";
  employeeTypeUpdateUrl = "http://localhost:8085/HRMS/employeetype/update"
 
  constructor(private http: Http) { }
  
  getAllEmployeeTypeList(): Observable<EmployeeType[]> {
    return this.http.get(this.allEmployeeTypeListUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  createUserType(employeeType: EmployeeType): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.employeeTypeCreateUrl, employeeType, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteUserTypeById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.employeeTypeDeleteUrl+id)
      .map(success => success.status)
      .catch(this.handleError);
  }
  getUserTypeById(id: string): Observable<EmployeeType> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.employeeTypegetById+id)
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateUserType(employeeType: EmployeeType):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.employeeTypeUpdateUrl, employeeType, options)
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
