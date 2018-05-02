import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../../services/Attendance/attendance.service';
import { Attendance } from '../../models/Attendance/Attendance.model';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee } from '../../models/Employee/Employee.model';
import { ValidationService } from '../../services/validation.service';
import { CommonService } from '../../services/common/common.service';
import { Http } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  allAttendance: Attendance[];
  allEmployee: Employee[];
  attendanceIdToUpdate = null; 
  selectedEntities: any[];
  Attendance = 'date';
  collection = [];
  toastMessage: string;
  selectedEmployee: any;
 
  @Output() loggedIn = new EventEmitter<Attendance>();
  constructor(private spinner: Ng4LoadingSpinnerService, private commonService: CommonService, 
    private attendanceService: AttendanceService, private formBuilder: FormBuilder, 
    private employeeService: EmployeeService,private router: Router,) {
  }
  attendanceForm = this.formBuilder.group({

    'employee': ['', ([Validators.required])],
    'intime': ['', ([Validators.required])],
    'outtime': ['', [Validators.required]],
    'date': ['', [Validators.required, ValidationService.currentDateValidation]],
  });

  ngOnInit(): void {
    this.getAllAttendanceList();
    this.getAllEmployeeList();
    this.commonService.onPreviousNextPage();
    
    // this.timeValidation();
  }
  validate() {
    Object.keys(this.attendanceForm.controls).forEach(field => {
      const control = this.attendanceForm.get(field);
      control.markAsTouched({ onlySelf: true });

    });
  }
  
  getAllAttendanceList() {
    this.commonService.startLoadingSpinner();
    this.attendanceService.getAllAttendance()
      .subscribe(
      data => this.allAttendance = data);
    this.commonService.hideSpinner();
  }

  getAllEmployeeList() {
    this.employeeService.getAllEmployeeList()
      .subscribe(
      data => this.allEmployee = data);
  }
  onEmployeeAttendanceFormSubmit() {
 
    this.commonService.startLoadingSpinner();
    if (this.attendanceForm.invalid) {
      return;
    }
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
      this.loggedIn.emit(new Attendance(null, employee, intime, outtime, date));
      this.attendanceService.createEmployeeAttendance(attendance).subscribe(data => {
        const message = data.message;
        this.toastMessage = message;
        this.getAllAttendanceList();
        this.attendanceForm.reset();
       this.commonService.closeForm();
        

      });
    } else {
      const userType = new Attendance(this.attendanceIdToUpdate, employee, intime, outtime, date);
      this.attendanceService.updateEmployeeAttendance(userType)
        .subscribe(data => {
          const message = data.message;
          this.toastMessage = message;       
          this.attendanceForm.reset();
          this.commonService.closeForm();
          this.getAllAttendanceList();
        
        },);
      this.commonService.hideSpinner();
    }
  }
  deleteEmployeeAttendance(id: string) {

    this.commonService.startLoadingSpinner();
    this.attendanceService.deleteEmployeeAttendanceById(id)
      .subscribe(successCode => {
        this.getAllAttendanceList();
        // let message = successCode.message;
        this.toastMessage = successCode.message;
      },);
    this.commonService.hideSpinner();
  }
  loadEmployeeAttendanceToEdit(id: string) {

    this.commonService.startLoadingSpinner();
    this.attendanceService.getEmployeeAttendanceById(id)
      .subscribe(data => {
        this.attendanceIdToUpdate = data.id;
        /*if (this.attendanceIdToUpdate != null) {
          (document.getElementById('employee') as HTMLButtonElement).disabled = true;
        }*/
        // this.userid = data.employee.userid
        this.attendanceForm.setValue({ employee: data.employee.id, intime: data.intime, outtime: data.outtime, date: data.date });
     
      },);
    this.commonService.hideSpinner();
  }
 
  onSelect(employeeId) {
    this.selectedEmployee = null;
    for (let i = 0; i < this.allEmployee.length; i++) {
      if (this.allEmployee[i].id === employeeId) {
        this.selectedEmployee = this.allEmployee[i].id;
      }
    }
  }
  
  
  displayToastMessage() {
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

  clearForm(){
    this.attendanceForm.reset();
  }
  
}


