import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../../services/Attendance/attendance.service';
import { Attendance } from '../../models/Attendance/Attendance.model';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee } from '../../models/Employee/Employee.model';
import { ValidationService } from '../../services/validation.service';
import { CommonService } from '../../services/common/common.service';
import { Http } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-selfattendance',
  templateUrl: './selfattendance.component.html',
  styleUrls: ['./selfattendance.component.css']
})
export class SelfattendanceComponent implements OnInit {
  allAttendance: Attendance[];
  attendanceWorkInfo: Attendance[];
  statusCode: number;
  requestProcessing = false;
  date: any;
  collection = [];
  constructor(private spinner: Ng4LoadingSpinnerService, private commonService: CommonService, private attendanceService: AttendanceService, private formBuilder: FormBuilder,
     private employeeService: EmployeeService,private router: Router) { }
  attendanceForm = this.formBuilder.group({
    'date': ['', [Validators.required, ValidationService.currentMonthValidation]],
  });

  ngOnInit() {
    // this.getAllAttendanceListBYIDandDate();
    this.commonService.onPreviousNextPage();
  }
  getAllAttendanceListBYIDandDate() {
    this.date = ((document.getElementById('date') as HTMLInputElement).value);
    this.commonService.startLoadingSpinner();
    this.attendanceService.getAllAttendanceBYDate(this.date)
      .subscribe(
      data => {
        this.allAttendance = data.data;
        const code = data.code;
        console.log('code:', code);
        if (code === 0) {
          document.getElementById('data').innerHTML = 'There is no any attendance for this month';
        } else {
          document.getElementById('data').innerHTML = '';
        }
      },
      errorCode => this.statusCode = errorCode);
    this.commonService.hideSpinner();
  }
  calculateAllAttendanceListBYIDandDate() {
    this.date = ((document.getElementById('date') as HTMLInputElement).value);
    this.commonService.startLoadingSpinner();
    this.attendanceService.calculateAttendanceWork(this.date)
      .subscribe(
      data => {
        this.attendanceWorkInfo = data.data;
      },
      errorCode => this.statusCode = errorCode);
    this.commonService.hideSpinner();
  }
  redirectToRegularization() {
    this.router.navigate(['./regularization']);
  }
}
