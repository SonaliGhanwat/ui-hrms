
import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Holiday } from '../../models/Holiday/Holiday.model';
import { BaseService } from '../base.service';

@Injectable()
export class HolidayService extends BaseService {
  holidayUrl = 'holiday/';
  constructor(protected http: Http) {
    super(http);
  }
  getAllHolidayList(): Observable<Holiday[]> {
    return this.http.get(this.buidURL(this.holidayUrl + this.list_url))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createHoliday(holiday: Holiday): Observable<any> {
    return this.http.post(this.buidURL(this.holidayUrl + this.create_url), holiday)
      .map(success => success.json())
      .catch(this.handleError);
  }
  deleteHolidayById(id: string): Observable<any> {
    return this.http.delete(this.buidURL(this.holidayUrl + this.delete_url + id))
      .map(success => success.json())
      .catch(this.handleError);
  }
  getHolidayById(id: string): Observable<Holiday> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const cpParams = new URLSearchParams();
    cpParams.set('id', id);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.holidayUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateHoliday (holiday: Holiday): Observable<any> {
    return this.http.put (this.buidURL (this.holidayUrl + this.update_url), holiday)
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


