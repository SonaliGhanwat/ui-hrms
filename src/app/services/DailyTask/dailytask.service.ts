import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DailyTask} from '../../models/DailyTask/DailyTask.model';

@Injectable()
export class DailytaskService {

  allDailyTaskListUrl = "http://localhost:8085/HRMS/employeedailytask/list";
  dailyTaskCreateUrl = "http://localhost:8085/HRMS/employeedailytask/create";
  dailyTaskDeleteUrl = "http://localhost:8085/HRMS/employeedailytask/delete/";
  dailyTaskgetById ="http://localhost:8085/HRMS/employeedailytask/";
  dailyTaskUpdateUrl = "http://localhost:8085/HRMS/employeedailytask/update"
 
  constructor(private http: Http) { }
  
  getAllDailyTaskList(): Observable<DailyTask[]> {
    return this.http.get(this.allDailyTaskListUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  createDailyTask(dailyTask: DailyTask): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.dailyTaskCreateUrl, dailyTask, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteDailyTaskById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.dailyTaskDeleteUrl+id)
      .map(success => success.status)
      .catch(this.handleError);
  }
  getDailyTaskById(id: string): Observable<DailyTask> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.dailyTaskgetById+id)
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateDailyTask(dailyTask: DailyTask):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.dailyTaskUpdateUrl, dailyTask, options)
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
