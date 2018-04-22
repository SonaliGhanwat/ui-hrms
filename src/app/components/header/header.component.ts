import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../../services/app-data/app-data.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    isLogoutBtnVisible: Boolean = false;
    isUserNameVisible: Boolean = false;

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
        
    }

    setHeaderUIData(): void {
        this.isLogoutBtnVisible = this.appData.getUser() ? true : false;
        this.isUserNameVisible = this.appData.getUser() ? true : false;
    }

    logout(): void {
        this.appData.clearAppData();
        this.setHeaderUIData();
        this.router.navigate(['/login']);
    }



}
