import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/Leave/leave.service';
import { Leave } from '../../models/Leave/Leave.model';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee } from '../../models/Employee/Employee.model';
import { LeavetypeService } from '../../services/LeaveType/leavetype.service';
import { LeaveType } from '../../models/LeaveType/Leavetype.model';
import { ValidationService } from '../../services/validation.service';
import { CommonService } from '../../services/common/common.service';
@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  allLeave: Leave[];
  allEmployee: Employee[];
  allLeavetypes: LeaveType[];
  statusCode: number;
  requestProcessing = false;
  leaveIdToUpdate = null;
  processValidation = false;
  collection = [];
  toastMessage: string;

  constructor(private commonService: CommonService, private leaveService: LeaveService, private formBuilder: FormBuilder,
    private employeeService: EmployeeService, private leavetypeService: LeavetypeService) { }
  leaveForm = this.formBuilder.group({
    'employee': ['', ([Validators.required])],
    'subject': ['', ([Validators.required])],
    'fromDate': ['', [Validators.required, ValidationService.dateValidation,ValidationService.checkWeekend]],
    'toDate': ['', [Validators.required]],
    'leavetype': ['', ([Validators.required])],
  });

  ngOnInit(): void {
    this.getAllLeaveList();
    this.getAllEmployeeList();
    this.getAllLeaveTypes();
    this.commonService.onPreviousNextPage();
    this.toDateValidation();
  }
  
  getAllLeaveList() {
    this.commonService.startLoadingSpinner();
    this.leaveService.getAllLeave()
      .subscribe(
      data => this.allLeave = data,
      errorCode => this.statusCode = errorCode);
      this.commonService.hideSpinner();
  }
  getAllEmployeeList() {
    this.employeeService.getAllEmployeeList()
      .subscribe(
      data => this.allEmployee = data,
      errorCode => this.statusCode = errorCode);
  }
  getAllLeaveTypes() {
    this.leavetypeService.getAllLeaveTypeList()
      .subscribe(
      data => this.allLeavetypes = data,
      errorCode => this.statusCode = errorCode);
  }
  onLeaveFormSubmit() {
    this.preProcessConfigurations();
    this.commonService.startLoadingSpinner();
    const employeeId = ((document.getElementById('employee') as HTMLInputElement).value);
    const employee = parseInt(employeeId);
    const subject = this.leaveForm.get('subject').value;
    const fromDate = this.leaveForm.get('fromDate').value;
    const toDate = this.leaveForm.get('toDate').value;
    const leaveTypeId = ((document.getElementById('leavetype') as HTMLInputElement).value);
    const leavetype = parseInt(leaveTypeId);
    if (this.leaveIdToUpdate === null) {
      const attendance = new Leave(null, employee, subject, fromDate, toDate, leavetype,null);
      this.leaveService.createLeave(attendance)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.commonService.hideSpinner();
          this.toastMessage = successCode.message;
          this.getAllLeaveList();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    } else {
      const userType = new Leave(this.leaveIdToUpdate, employee, subject, fromDate, toDate, leavetype,null);
      this.leaveService.updateLeave(userType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllLeaveList();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deleteLeave(id: string) {
    this.preProcessConfigurations();
    this.commonService.startLoadingSpinner();
    this.leaveService.deleteLeaveById(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.message;
        this.getAllLeaveList();
        this.backToCreateArticle();
        this.commonService.hideSpinner();
      },
      errorCode => this.statusCode = errorCode);
  }
  loadLeaveToEdit(id: string) {
    this.preProcessConfigurations();
    this.leaveService.getLeaveById(id)
      .subscribe(data => {
        this.leaveIdToUpdate = data.id;
        this.leaveForm.setValue({ employee: data.employee.id, subject: data.subject, fromDate: data.fromDate, toDate: data.toDate, leavetype: data.leavetype.id });
        this.processValidation = true;
        this.requestProcessing = false;
      },
      errorCode => this.statusCode = errorCode);
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  backToCreateArticle() {
    this.leaveIdToUpdate = null;
    this.leaveForm.reset();
    this.processValidation = false;
  }
  toastMessageDisplay() {
    this.commonService.displayMessage();
  }
  toDateValidation() {
    const fromDate = this.leaveForm.get('fromDate').value;
    const toDate = this.leaveForm.get('toDate').value;
    if (fromDate <= toDate) {
    } else if (toDate <= fromDate) {
      document.getElementById('afterleavejoiningdate_validation').innerHTML = 'Invalid Date!! After leave joining date  should be greater then Leave date';
      return false;
    }
    document.getElementById('afterleavejoiningdate_validation').innerHTML = '';
    return true;
  }
}
