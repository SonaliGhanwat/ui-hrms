
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Holiday } from '../../models/Holiday/Holiday.model';

@Injectable()
export class HolidayService {

  allHolidayListUrl = "http://localhost:8085/HRMS/holiday/list";
  holidayCreateUrl = "http://localhost:8085/HRMS/holiday/create";
  holidayDeleteUrl = "http://localhost:8085/HRMS/holiday/delete/";
  holidaygetById ="http://localhost:8085/HRMS/holiday/";
  holidayUpdateUrl = "http://localhost:8085/HRMS/holiday/update"
  constructor(private http: Http) { }

  getAllHolidayList(): Observable<Holiday[]> {
    return this.http.get(this.allHolidayListUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }
  createHoliday(holiday: Holiday): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.holidayCreateUrl, holiday, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteHolidayById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.holidayDeleteUrl+id)
      .map(success => success.status)
      .catch(this.handleError);
  }
  getHolidayById(id: string): Observable<Holiday> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.holidaygetById+id)
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateHoliday(holiday: Holiday):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.holidayUpdateUrl, holiday, options)
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


