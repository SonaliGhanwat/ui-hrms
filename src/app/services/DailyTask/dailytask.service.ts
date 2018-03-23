import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DailyTask } from '../../models/DailyTask/DailyTask.model';
import { BaseService } from '../base.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Injectable()
export class DailytaskService extends BaseService {
  dailyTaskUrl = 'employeedailytask/';
  dailytasklist_url = 'list/';
  myCookie:any;
  constructor(protected http: Http) {
    super(http);
  }
  getAllDailyTaskList(): Observable<DailyTask[]> {
    this.myCookie = Cookie.get('cookieName');
    return this.http.get(this.buidURL(this.dailyTaskUrl + this.dailytasklist_url+this.myCookie))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createDailyTask(dailyTask: DailyTask): Observable<any> {
    return this.http.post(this.buidURL(this.dailyTaskUrl + this.create_url), dailyTask)
      .map(success => success.json())
      .catch(this.handleError);
  }
  deleteDailyTaskById(id: string): Observable<any> {
    return this.http.delete(this.buidURL(this.dailyTaskUrl + this.delete_url + id))
      .map(success => success.json())
      .catch(this.handleError);
  }
  getDailyTaskById(id: string): Observable<DailyTask> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const cpParams = new URLSearchParams();
    cpParams.set('id', id);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.dailyTaskUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateDailyTask(dailyTask: DailyTask): Observable<any> {
    return this.http.put(this.buidURL(this.dailyTaskUrl + this.update_url), dailyTask)
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
