import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DailyTask} from '../../models/DailyTask/DailyTask.model';
import { BaseService } from '../base.service';

@Injectable()
export class DailytaskService extends BaseService {

  allDailyTaskListUrl = "employeedailytask/list";
  dailyTaskCreateUrl = "employeedailytask/create";
  dailyTaskDeleteUrl = "employeedailytask/delete/";
  dailyTaskgetById ="employeedailytask/";
  dailyTaskUpdateUrl = "employeedailytask/update"
 
  constructor(protected http: Http) {
    super(http);
  }
  
  getAllDailyTaskList(): Observable<DailyTask[]> {
    return this.http.get(this.buidURL(this.allDailyTaskListUrl))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createDailyTask(dailyTask: DailyTask): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.dailyTaskCreateUrl), dailyTask, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteDailyTaskById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.buidURL(this.dailyTaskDeleteUrl+id))
      .map(success => success.status)
      .catch(this.handleError);
  }
  getDailyTaskById(id: string): Observable<DailyTask> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.dailyTaskgetById+id))
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateDailyTask(dailyTask: DailyTask):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.buidURL(this.dailyTaskUpdateUrl), dailyTask, options)
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