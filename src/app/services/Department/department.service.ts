import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Department } from '../../models/Department/department.model';
import { BaseService } from '../base.service';
@Injectable()
export class DepartmentService extends BaseService {

  departmentUrl = 'department/';
  departmentList =  'department/';
  constructor(protected http: Http) {
    super(http);
  }
  getAllDepartmentList(): Observable<Department[]> {
    return this.http.get(this.buidURL(this.departmentUrl + this.list_url))
      .map(this.extractData)
      .catch(this.handleError);
  }
  DepartmentListByUsertypeId(id: number): Observable<any> {
    return this.http.get(this.buidURL(this.departmentUrl+this.departmentList + id))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createDepartment(department: Department): Observable<any> {
    return this.http.post(this.buidURL(this.departmentUrl + this.create_url), department)
      .map(success => success.json())
      .catch(this.handleError);
  }
  deleteDepartmentById(id: string): Observable<any> {
    return this.http.delete(this.buidURL(this.departmentUrl + this.delete_url + id))
      .map(success => success.json())
      .catch(this.handleError);
  }
  getDepartmentById(id: string): Observable<Department> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const cpParams = new URLSearchParams();
    cpParams.set('id', id);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.departmentUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateDepartment(department: Department): Observable<any> {
    return this.http.put(this.buidURL(this.departmentUrl + this.update_url), department)
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