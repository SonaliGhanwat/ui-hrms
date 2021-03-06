import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Leave } from '../../models/Leave/Leave.model';
import { BaseService } from '../base.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppDataService } from '../../services/app-data/app-data.service';

@Injectable()
export class LeaveService extends BaseService {
    leaveUrl = 'employeeleave/';
    leavelist_url = 'list';
    leaveReportUrl = 'leaveBalanceReport';
    myLeavesEndpoint = 'getlistByUserId/';
    calculateLeavebyUserid = 'calculateLeaveByUserId/';
    myCookie: any;

    constructor(protected http: Http,private appData: AppDataService) {
        super(http);
    }

    getAllLeave(): Observable<Leave[]> {
        return this.http.get(this.buidURL(this.leaveUrl + this.leavelist_url))
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAllLeaveforLeaveBalance(): Observable<any> {
        return this.http.get(this.buidURL(this.leaveUrl + this.leaveReportUrl))
            .map(this.extractData, success => success.json())
            .catch(this.handleError);
    }

    calculateLeaveByUserId(): Observable<any> {
        return this.http.get(this.buidURL(this.leaveUrl + this.calculateLeavebyUserid + this.appData.getUserId()))
            .map(this.extractData, success => success.json())
            .catch(this.handleError);
    }

    getLeaveByUserId(userId: string): Observable<any> {
        return this.http.get(this.buidURL(this.leaveUrl + this.myLeavesEndpoint + userId))
            .map(this.extractData, success => success.json())
            .catch(this.handleError);
    }

    createLeave(leave: Leave): Observable<any> {
        return this.http.post(this.buidURL(this.leaveUrl + this.create_url), leave)
            .map(success => success.json())
            .catch(this.handleError);
    }

    deleteLeaveById(id: string): Observable<any> {
        return this.http.delete(this.buidURL(this.leaveUrl + this.delete_url + id))
            .map(success => success.json())
            .catch(this.handleError);
    }

    getLeaveById(id: string): Observable<Leave> {
        const cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        const cpParams = new URLSearchParams();
        cpParams.set('id', id);
        const options = new RequestOptions({ headers: cpHeaders, params: cpParams });
        return this.http.get(this.buidURL(this.leaveUrl + id))
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    updateLeave(leave: Leave): Observable<any> {
        return this.http.put(this.buidURL(this.leaveUrl + this.update_url), leave)
            .map(success => success.json())
            .catch(this.handleError);
    }
    
    // protected extractData(res: Response) {
    //     const body = res.json();
    //     console.log('data:', body);
    //     return body;
    // }
    
    // protected handleError(error: Response | any) {
    //     console.error(error.message || error);
    //     return Observable.throw(error.status);
    // }

}
