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
        "link": '/usertype'
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
        "name": "Add Employee Attendance",
        "link": "/attendance"
      }, {
        "name": "View All Employee Attendance",
        "link": "/home"
      }]
    },{
      "name": "Daily Task",
      "subMenu": [{
        "name": "Add Employee Daily Task",
        "link": "/home"
      }, {
        "name": "View All Employee Daily Task",
        "link": "/home"
      }]
    },{
      "name": "Leave",
      "subMenu": [{
        "name": " Employee Leave",
        "link": "/home"
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

  ngOnInit() {
  }

}
