import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {

  name: string;
  show = false;
  menuList: any;
  selected: any;
  idleState: any;
  // timedOut = false; 
  toast: string;
  myCookie: any;
  mainMenu: string[] = []
  //subMenu:string[] = []
  menu: any[]
  subMenu: {};
  url: {};
  constructor(private router: Router, private idle: Idle, private keepalive: Keepalive) {




    this.menuList = [{
      'name': 'Employee',
      'subMenu': [{
        'name': 'Employee',
        'link': '/employee'
      }, {
        'name': 'Employee Type',
        'link': '/employeeType'
      }, {
        'name': 'Add Designation',
        'link': '/designation'
      }]
    }, {
      'name': 'Attendance',
      'subMenu': [{
        'name': 'Employee Attendance',
        'link': '/attendance'
      }, {
        'name': 'Self Attendance',
        'link': '/selfattendance'
      }]
    }, {
      'name': 'Daily Task',
      'subMenu': [{
        'name': 'Employee Daily Task',
        'link': '/dailyTask'
      }]
    }, {
      'name': 'Leave',
      'subMenu': [{
        'name': 'Employee Leave',
        'link': '/leave'
      }, {
        'name': 'Apply For Leave',
        'link': '/applyleave'
      }, {
        'name': 'My Leave Applications',
        'link': '/myleave'
      }, {
        'name': 'Leave Type',
        'link': '/leaveType'
      }, {
        'name': 'Leave Balance Report',
        'link': '/leavereport'
      }]
    }, {
      'name': 'User Managment',
      'subMenu': [{
        'name': 'User Type',
        'link': '/usertype'
      }, {
        'name': 'Page',
        'link': '/page'
      }, {
        'name': 'Add New User Type Page',
        'link': '/userTypePageAssociation'
      }]
    }, {
      'name': 'Holiday',
      'subMenu': [{
        'name': 'Add Holiday',
        'link': '/holiday'
      }]
    }, {
      'name': 'Approvals',
      'subMenu': [{
        'name': 'Approval',
        'link': '/approvals'
      }]
    }];
  }
  /*idle.setIdle(5);
  idle.setTimeout(5000);
  idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
  idle.onTimeout.subscribe(() => {
    this.idleState = 'Timed out! Please Login Again';
    this.router.navigate(['/login']);
    this.toast = this.idleState;
    alert(this.toast);
  });
  this.idle.watch();*/

  ngOnInit() {
    this.loginUserId();
    //this.getPageList();
  }

  getPageList() {
    let test2 = localStorage.getItem("loginData");
    let test = JSON.parse(test2);
    this.menuList = test.data.pages
    var cascadedMenu = [];

    for (var index = 0; index < this.menuList.length; index++) {
      var cascadedMenuItem = [];
      var isMenuAdded = false;
      var indexAdded = 0;
      for (var subindex=0; subindex < cascadedMenu.length ; subindex++){
        
				if(cascadedMenu[subindex].menu === this.menuList[index].menu ){
          var subMenu = {};
          this.subMenu = this.menuList[index].submenu;
          this.url = this.menuList[index].url;
          cascadedMenu.push({
           
            "submenu":this.subMenu,
            "url":this.url});
           
					isMenuAdded = true;
					indexAdded = subindex+1;
					break;
				}
			}
      if (cascadedMenu.length == 0 || !isMenuAdded) {  
        cascadedMenuItem = [];
        this.subMenu = this.menuList[index].submenu;
        this.url = this.menuList[index].url;
        cascadedMenuItem.push({
          "menu":this.menuList[index].menu,
          "submenu":this.subMenu,
          "url":this.url});
        cascadedMenu.push(cascadedMenuItem);
      }
    }
    return cascadedMenu;
  }
  select(item) {
    this.selected = (this.selected === item ? null : item);
  }

  isSelect(item) {
    return this.selected === item;
  }

  redirectToLoginPage() {
    this.router.navigate(['/login']);
    return true;
  }



  toastMessageDisplay() {
    const x = document.getElementById('toastbar');
    x.className = 'show';
    setTimeout(function () { x.className = x.className.replace('show', ''); }, 9000);
  }

  loginUserId() {
    this.myCookie = Cookie.get('cookieName');
  }
}
