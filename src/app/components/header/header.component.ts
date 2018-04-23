import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../../services/app-data/app-data.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isLogoutBtnVisible: Boolean = true;
    isUserNameVisible: Boolean = true;
    userid: string;
    constructor(private router: Router,
        private appData: AppDataService) { }

    ngOnInit() {
        this.appData.getDataObservable().subscribe(data => {
            console.log('HeaderComponent...');
            this.setHeaderUIData();
        },
            error => {
                console.log('error');
            });
        this.setUserId();
    }

    setHeaderUIData(): void {
        this.isLogoutBtnVisible = this.appData.getUser() ? true : false;
        this.isUserNameVisible = this.appData.getUser() ? true : false;
    }

    setUserId() {
        this.userid = this.appData.getUserId();
        console.log('userid:', this.userid);
    }
    logout(): void {
        this.appData.clearAppData();
        this.setHeaderUIData();
        this.router.navigate(['/login']);
    }
}
