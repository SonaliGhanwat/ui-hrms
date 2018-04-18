import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { PageAssociation } from '../../models/UserType-Pageassociation/UserType-PageAsso.model';
import { BaseService } from '../base.service';
@Injectable()
export class UsertypePageassociationService extends BaseService{
  pageUrl = 'usertypepageassociation/';
  createUrl = 'createMultiple'
  constructor(protected http: Http) {
    super(http);
  }

  getAllUserTypePageAssoList(): Observable<any> {
    return this.http.get(this.buidURL(this.pageUrl + this.list_url))
      .map(this.extractData)
      .catch(this.handleError);
  }
createPageAssoList(page: PageAssociation): Observable<any> {
    return this.http.post(this.buidURL(this.pageUrl + this.createUrl), page)
      .map(success => success.json())
      .catch(this.handleError);
  }
  deletePageAsso(id: string): Observable<any> {
    return this.http.delete(this.buidURL(this.pageUrl + this.delete_url + id))
      .map(success => success.json())
      .catch(this.handleError);
  }
  getPageAssoById(id: string): Observable<any> {
    const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    const cpParams = new URLSearchParams();
    cpParams.set('id', id);
    const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.buidURL(this.pageUrl + id))
      .map(this.extractData)
      .catch(this.handleError);
  }
  updatePageAsso(page: PageAssociation): Observable<any> {
    return this.http.put(this.buidURL(this.pageUrl + this.update_url), page)
      .map(success => success.json())
      .catch(this.handleError);
  }
}
