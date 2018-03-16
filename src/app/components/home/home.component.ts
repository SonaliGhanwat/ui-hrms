import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string;
  show: boolean = false;
  menuList: any;
  selected: any;
  idleState: any;
  // timedOut = false; 
  toast: string;
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
        'name': 'Leave Type',
        'link': '/leaveType'
      }]
    }, {
      'name': 'User Managment',
      'subMenu': [{
        'name': 'User Type',
        'link': '/usertype'
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
        'name': "Approval",
        'link': '/approvals'
      }]
    }];

    idle.setIdle(5);
    idle.setTimeout(5000);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out! Please Login Again';
      this.router.navigate(['/login']);
      this.toast = this.idleState;
      alert(this.toast);
      console.log("this.toastMessag:", this.toast);
    });
    this.idle.watch();
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
  ngOnInit() {
  }
  toastMessageDisplay() {
    let x = document.getElementById("toastbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 9000);
  }

}