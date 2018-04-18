import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { PageModel } from '../../models/Page/page.model';
import { BaseService } from '../base.service';
@Injectable()
export class PageService extends BaseService{
  pageUrl = 'page/';
  constructor(protected http: Http) {
    super(http);
  }
  getAllPageList(): Observable<any> {
    return this.http.get(this.buidURL(this.pageUrl + this.list_url))
      .map(this.extractData)
      .catch(this.handleError);
  }
  createPage(page: PageModel): Observable<any> {
    return this.http.post(this.buidURL(this.pageUrl + this.create_url), page)
      .map(success => success.json())
      .catch(this.handleError);
  }
  deletePage(id: string): Observable<any> {
    return this.http.delete(this.buidURL(this.pageUrl + this.delete_url + id))
      .map(success => success.json())
      .catch(this.handleError);
  }
  getPageById(id: string): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const cpParams = new URLSearchParams();
    cpParams.set('id', id);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.pageUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPageByIdList(id: string): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const cpParams = new URLSearchParams();
    cpParams.set('id', id);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.pageUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }
  updatePage(page: PageModel): Observable<any> {
    return this.http.put(this.buidURL(this.pageUrl + this.update_url), page)
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
