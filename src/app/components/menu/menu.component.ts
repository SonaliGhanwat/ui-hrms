import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AppDataService } from '../../services/app-data/app-data.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

    name: string;
    show = false;
    menu: string;
    subMenu: string;
    menuList: Array<any> = [];
    toast: string;
    myCookie: any;

    constructor(private router: Router,
        private appData: AppDataService,
        private idle: Idle,
        private keepalive: Keepalive) {
    }

    ngOnInit() {
        this.appData.getDataObservable().subscribe(data => {
            this.menuList = this.getMenuList(this.appData.getPages());
            console.log('inside subscribe menu...', this.appData.getPages());
            console.log('menuList...', this.menuList);
        }, error => {

        });
        
    }

    getMenuList(pages: Array<any>): any[] {
        const cascadedMenu = [];
        if (pages) {
            for (let index = 0; index < pages.length; index++) {
                let isMenuAdded = false;
                for (let subindex = 0; subindex < cascadedMenu.length; subindex++) {

                    if (cascadedMenu[subindex].name === pages[index].menu) {
                        cascadedMenu[subindex].subMenu.push({
                            'name': pages[index].submenu,
                            'link': pages[index].url
                        });
                        isMenuAdded = true;
                        break;
                    }
                }
                if (cascadedMenu.length === 0 || !isMenuAdded) {
                    const subMenu = [];
                    const subMenuItem = {};
                    subMenuItem['name'] = pages[index].submenu;
                    subMenuItem['link'] = pages[index].url;
                    subMenu.push(subMenuItem);
                    cascadedMenu.push({
                        'name': pages[index].menu,
                        'subMenu': subMenu
                    });
                }
            }
        }
        return cascadedMenu;
    }

    onSubmenuClicked(item: string) {
        this.subMenu = item;
    }

    onMenuClicked(item: string) {
        this.menu = item;
    }

    isMenuSelected(item) {
        return this.menu === item;
    }

    isSubmenuSelected(item) {
        return this.subMenu === item ;
    }

    redirectToLoginPage() {
        this.router.navigate(['/login']);
        return true;
    }

   

    // loginUserId() {
    //     this.myCookie = Cookie.get('cookieName');
    // }
}
