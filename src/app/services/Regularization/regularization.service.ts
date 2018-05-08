import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Regularization } from '../../models/Regularization/Regularization.model';
import { BaseService } from '../base.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppDataService } from '../../services/app-data/app-data.service';
@Injectable()
export class RegularizationService extends BaseService {
  regularizationUrl = 'regularization/';
  regularization_url = 'list';
  constructor(protected http: Http, private appData: AppDataService, ) {
    super(http);
  }
  getAllRegularization(): Observable<Regularization[]> {
    return this.http.get(this.buidURL(this.regularizationUrl + this.regularization_url))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createRegularization(attendance: Regularization): Observable<any> {
    return this.http.post(this.buidURL(this.regularizationUrl + this.create_url), attendance)
      .map(success => success.json())
      .catch(this.handleError);
  }
  deleteRegularizationById(id: string): Observable<any> {
    return this.http.delete(this.buidURL(this.regularizationUrl + this.delete_url + id))
      .map(success => success.json())
      .catch(this.handleError);
  }
  getRegularizationById(id: string): Observable<Regularization> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const cpParams = new URLSearchParams();
    cpParams.set('id', id);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.regularizationUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }
  updateRegularization(attendance: Regularization): Observable<any> {
    return this.http.put(this.buidURL(this.regularizationUrl + this.update_url), attendance)
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
