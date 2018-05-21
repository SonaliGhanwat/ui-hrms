import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ProjectModel} from '../../models/Project/project.model'
import { BaseService } from '../base.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppDataService } from '../../services/app-data/app-data.service';
@Injectable()
export class ProjectService extends BaseService{
  projectUrl = 'project/';
  projectList_url = 'list';
  constructor(protected http: Http, private appData: AppDataService,) {
    super(http);
  }
  getAllProject(): Observable<ProjectModel[]> {
    return this.http.get(this.buidURL(this.projectUrl + this.projectList_url))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createProject(project: ProjectModel): Observable<any> {
    return this.http.post(this.buidURL(this.projectUrl + this.create_url), project)
      .map(success => success.json())
      .catch(this.handleError);
  }
  deleteProjectById(id: string): Observable<any> {
    return this.http.delete(this.buidURL(this.projectUrl + this.delete_url + id))
      .map(success => success.json())
      .catch(this.handleError);
  }
  getProjectById(id: string): Observable<ProjectModel> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const cpParams = new URLSearchParams();
    cpParams.set('id', id);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.projectUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateProject(project: ProjectModel): Observable<any> {
    return this.http.put(this.buidURL(this.projectUrl + this.update_url), project)
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
}
