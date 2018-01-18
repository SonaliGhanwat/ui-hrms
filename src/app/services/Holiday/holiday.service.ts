
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Holiday } from '../../models/Holiday/Holiday.model';
import { BaseService } from '../base.service';

@Injectable()
export class HolidayService extends BaseService{

  allHolidayListUrl = "holiday/list";
  holidayCreateUrl = "holiday/create";
  holidayDeleteUrl = "holiday/delete/";
  holidaygetById ="holiday/";
  holidayUpdateUrl = "holiday/update"
  constructor(protected http: Http) {
    super(http);
  }
  getAllHolidayList(): Observable<Holiday[]> {
    return this.http.get(this.buidURL(this.allHolidayListUrl))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createHoliday(holiday: Holiday): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.buidURL(this.holidayCreateUrl), holiday, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteHolidayById(id: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    return this.http.delete(this.buidURL(this.holidayDeleteUrl+id))
      .map(success => success.status)
      .catch(this.handleError);
  }
  getHolidayById(id: string): Observable<Holiday> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', id);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.holidaygetById+id))
      .map(this.extractData)
      .catch(this.handleError);
      }	

  updateHoliday(holiday: Holiday):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: cpHeaders });
          return this.http.put(this.buidURL(this.holidayUpdateUrl), holiday, options)
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


