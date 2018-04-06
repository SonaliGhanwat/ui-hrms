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
@Component({
  selector: 'app-selfattendance',
  templateUrl: './selfattendance.component.html',
  styleUrls: ['./selfattendance.component.css']
})
export class SelfattendanceComponent implements OnInit {
  allAttendance: Attendance[];
  statusCode: number;
  requestProcessing = false;
  date : any
  constructor(private spinner: Ng4LoadingSpinnerService, private commonService: CommonService, private attendanceService: AttendanceService, private formBuilder: FormBuilder, private employeeService: EmployeeService) { }
  attendanceForm = this.formBuilder.group({
    
        'date': ['', [Validators.required,ValidationService.currentMonthValidation]],
      });
    
  ngOnInit() {
    //this.getAllAttendanceListBYIDandDate();
    this.commonService.onPreviousNextPage();
  }
  getAllAttendanceListBYIDandDate() {
    this.commonService.startLoadingSpinner();
    this.date = ((document.getElementById('date') as HTMLInputElement).value);
    this.attendanceService.getAllAttendanceBYDate(this.date)
      .subscribe(
      data => this.allAttendance = data,
      errorCode => this.statusCode = errorCode);
    this.commonService.hideSpinner();
  }
}
