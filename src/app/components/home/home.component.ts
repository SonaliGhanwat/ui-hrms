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
        "name": "Add Employee",
        "link": '/usertype'
      }, {
        "name": "View All Employee",
        "link": "/home"
      }, {
        "name": "Add Employee Type",
        "link": "/home"
      }, {
        "name": "Add Designation",
        "link": "/home"
      }]
    }, {
      "name": "Attendance",
      "subMenu": [{
        "name": "Add Employee Attendance",
        "link": "/home"
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
        "name": "Add Employee Leave",
        "link": "/home"
      }, {
        "name": "View All Employee Leave",
        "link": "/home"
      },{
        "name": "Add Leave Type",
        "link": "/home"
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
        "link": "/home"
      }, {
        "name": "View All Holiday",
        "link": "/home"
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
