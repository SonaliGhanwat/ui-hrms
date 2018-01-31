import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {

    this.menuList = [{
      "name": "Employee",
      "subMenu": [{
        "name": "Employee",
        "link": '/employee'
      }, {
        "name": "Employee Type",
        "link": "/employeeType"
      }, {
        "name": "Add Designation",
        "link": "/designation"
      }]
    }, {
      "name": "Attendance",
      "subMenu": [{
        "name": " Employee Attendance",
        "link": "/attendance"
      }]
    },{
      "name": "Daily Task",
      "subMenu": [{
        "name": "Employee Daily Task",
        "link": "/dailyTask"
      },]
    },{
      "name": "Leave",
      "subMenu": [{
        "name": " Employee Leave",
        "link": "/leave"
      },{
        "name": " Leave Type",
        "link": "/leaveType"
      }]
    },{
      "name": "User Managment",
      "subMenu": [{
        "name": " User Type",
        "link": "/usertype"
      }]
    },{
      "name": "Holiday",
      "subMenu": [{
        "name": "Add Holiday",
        "link": "/holiday"
      }]
    }]
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

}
