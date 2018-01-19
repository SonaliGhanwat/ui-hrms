import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';

export class BaseService {

    protected base_url = "http://localhost:8085/HRMS/";
    protected create_url="create";
    protected list_url="list"
    protected delete_url="delete/"
    protected update_url="update"
  
  constructor(protected http: Http) { }

  protected buidURL(endpoint: string): string{
    return this.base_url + endpoint;
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