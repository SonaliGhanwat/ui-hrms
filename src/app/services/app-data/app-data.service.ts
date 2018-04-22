import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const USER_ID = 'userid';
const USER_PAGE_ACCESS = 'pages';
const USER_INFO = 'user';
@Injectable()
export class AppDataService {

    data: any= {};
    dataSubject: BehaviorSubject<any>;
    localStorageObservable: Observable<any>;
    localStorageOberver: any;
    constructor() {
        this.createDataSubject();
        // this.localStorageObservable = new Observable((observer) => {
        //     this.localStorageOberver = observer;
        //     observer.next(localStorage);
        // });
     }

     createDataSubject(data?: any): void {
        this.dataSubject = new BehaviorSubject(data);
     }

     setDataSubject(data?:any): void {
         this.dataSubject.next(data);
     }

     getDataObservable(): Observable<any> {
         return this.dataSubject.asObservable();
     }
    

    public getUserId(): string {
        return localStorage.getItem(USER_ID);
    }

    public setUserId(userId: string): void {
        if (userId) {
            localStorage.setItem(USER_ID, userId);
            this.setDataSubject(localStorage);
        }
    }

    public getPages(): Array<any> {
        return JSON.parse(localStorage.getItem(USER_PAGE_ACCESS));
    }

    public setPages(pages: Array<any>) {
        if(pages && pages.length > 0) {
            localStorage.setItem(USER_PAGE_ACCESS,JSON.stringify(pages));
            this.setDataSubject(localStorage);
        }
    }

    public getUser(): any {
        return JSON.parse(localStorage.getItem(USER_INFO));
    }

    public setUser(user: any) {
        if(user) {
            localStorage.setItem(USER_INFO,JSON.stringify(user));
            this.setDataSubject(localStorage);
        }
    }

    clearAppData(): void {
        localStorage.clear();
        this.setDataSubject(localStorage);
    }

}
