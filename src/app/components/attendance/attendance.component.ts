import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../../services/Attendance/attendance.service';
import { Attendance } from '../../models/Attendance/Attendance.model';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee } from '../../models/Employee/Employee.model';
import { ValidationService } from '../../services/validation.service';
import { CommonService } from '../../services/common service/common.service';
import { Http } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  allAttendance: Attendance[];
  allEmployee: Employee[];
  statusCode: number;
  requestProcessing = false;
  attendanceIdToUpdate = null;
  processValidation = false;
  selectedEntities: any[];
  Attendance = 'date';
  collection = [];
  toastMessage: string;
  selectedEmployee: any;
  constructor(private commonService: CommonService, private attendanceService: AttendanceService, private formBuilder: FormBuilder, private employeeService: EmployeeService) {

  }
  attendanceForm = this.formBuilder.group({

    'employee': ['', ([Validators.required])],
    'intime': ['', ([Validators.required])],
    'outtime': ['', [Validators.required, ValidationService.outTimeValidation]],
    'date': ['', [ValidationService.currentDateValidation]],
  });


  ngOnInit(): void {
    this.getAllAttendanceList();
    this.getAllEmployeeList();
    this.commonService.onPreviousNextPage();
    this.timeValidation();
  }

  getAllAttendanceList() {
    this.commonService.startLoadingSpinner();
    this.attendanceService.getAllAttendance()
      .subscribe(
      data => this.allAttendance = data,
      errorCode => this.statusCode = errorCode);
  }

  getAllEmployeeList() {
    this.employeeService.getAllEmployeeList()
      .subscribe(
      data => this.allEmployee = data,
      errorCode => this.statusCode = errorCode);
  }
  onEmployeeAttendanceFormSubmit() {
    this.preProcessConfigurations();
    // let employeeId = this.attendanceForm.get('employee').value.trim();
    const employeeId = ((document.getElementById('employee') as HTMLInputElement).value);
    const employee = parseInt(employeeId);
    let intime = this.attendanceForm.get('intime').value;
    if (intime.split(':').length === 2) {
      intime = this.attendanceForm.get('intime').value + ':00';
    } else {
      intime = this.attendanceForm.get('intime').value;
    }
    let outtime = this.attendanceForm.get('outtime').value;
    if (outtime.split(':').length === 2) {
      outtime = this.attendanceForm.get('outtime').value + ':00';
    } else {
      outtime = this.attendanceForm.get('outtime').value;
    }
    const date = this.attendanceForm.get('date').value;
    if (this.attendanceIdToUpdate === null) {
      const attendance = new Attendance(null, employee, intime, outtime, date);
      this.attendanceService.createEmployeeAttendance(attendance).subscribe(data => {
        Cookie.deleteAll();
        const myCookie = Cookie.get('url');
        const message = data.message;
        this.toastMessage = message;
        this.getAllAttendanceList();
        this.backToCreateArticle();
      });
    } else {
      const userType = new Attendance(this.attendanceIdToUpdate, employee, intime, outtime, date);
      this.attendanceService.updateEmployeeAttendance(userType)
        .subscribe(data => {
          const message = data.message;
          this.toastMessage = message;
          this.getAllAttendanceList();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deleteEmployeeAttendance(id: string) {
    this.preProcessConfigurations();
    this.attendanceService.deleteEmployeeAttendanceById(id)
      .subscribe(successCode => {
        this.getAllAttendanceList();
        this.backToCreateArticle();
        // let message = successCode.message;
        this.toastMessage = successCode.message;
      },
      errorCode => this.statusCode = errorCode);
  }
  loadEmployeeAttendanceToEdit(id: string) {
    this.preProcessConfigurations();
    this.attendanceService.getEmployeeAttendanceById(id)
      .subscribe(data => {
        this.attendanceIdToUpdate = data.id;
        /* if(this.attendanceIdToUpdate !=null){
           (document.getElementById('employee') as HTMLButtonElement).disabled = true;   
         }*/

        // this.userid = data.employee.userid
        this.attendanceForm.setValue({ employee: data.employee.id, intime: data.intime, outtime: data.outtime, date: data.date });
        this.processValidation = true;
        this.requestProcessing = false;
      },
      errorCode => this.statusCode = errorCode);
  }
  onSelect(employeeId) {
    this.selectedEmployee = null;
    for (let i = 0; i < this.allEmployee.length; i++) {
      if (this.allEmployee[i].id === employeeId) {
        this.selectedEmployee = this.allEmployee[i].id;
      }
    }
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  backToCreateArticle() {
    this.attendanceIdToUpdate = null;
    this.attendanceForm.reset();
    this.processValidation = false;
    this.getAllAttendanceList();
  }
  toastMessageDisplay() {
    this.commonService.displayMessage();
  }
  public setSelectedEntities($event: any) {
    this.selectedEntities = $event;
  }
  loadingSpinner() {
    this.commonService.startLoadingSpinner();
  }
  timeValidation() {
    const intime = this.attendanceForm.get('intime').value;
    const outtime = this.attendanceForm.get('outtime').value;
    if (intime <= outtime) {
    } else if (outtime <= intime) {
      document.getElementById('outtime_validation').innerHTML = 'OutTime  should be greater then InTime';
      return false;
    }
    document.getElementById('outtime_validation').innerHTML = '';
    return true;
  }

}


