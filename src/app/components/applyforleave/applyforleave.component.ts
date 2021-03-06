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
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-applyforleave',
  templateUrl: './applyforleave.component.html',
  styleUrls: ['./applyforleave.component.css']
})
export class ApplyforleaveComponent implements OnInit {
  allLeave: Leave[];
  allEmployee: Employee[];
  allLeavetypes: LeaveType[];
 
  leaveIdToUpdate = null;
 
  collection = [];
  toastMessage: string;

  constructor(private commonService: CommonService, private leaveService: LeaveService, private formBuilder: FormBuilder,
    private employeeService: EmployeeService,private spinner: Ng4LoadingSpinnerService, private leavetypeService: LeavetypeService) { }
  leaveForm = this.formBuilder.group({
    'employee': ['', ([Validators.required])],
    'subject': ['', ([Validators.required])],
    'fromDate': ['', [Validators.required, ValidationService.dateValidation,ValidationService.checkWeekend]],
    'toDate': ['', [Validators.required]],
    'leavetype': ['', ([Validators.required])],
  });

  ngOnInit(): void {
    this.calculateLeave();
    this.getAllEmployeeList();
    this.getAllLeaveTypes();
    this.commonService.onPreviousNextPage();
    this.toDateValidation();
  }
  
 
  getAllEmployeeList() {
    this.employeeService.getAllEmployeeList()
      .subscribe(
      data => this.allEmployee = data);
    
  }
  getAllLeaveTypes() {
    this.leavetypeService.getAllLeaveTypeList()
      .subscribe(
      data => this.allLeavetypes = data);
  }
  calculateLeave() {
    this.spinner.show();
    this.leaveService.calculateLeaveByUserId()
      .subscribe(
      data => {
        this.allLeave = data.data;
      },);
    this.commonService.hideSpinner();
  }
  onLeaveFormSubmit() {

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
          
          this.toastMessage = successCode.message;
          this.commonService.hideSpinner();
          this.leaveForm.reset();
        },);
    } else {
      const userType = new Leave(this.leaveIdToUpdate, employee, subject, fromDate, toDate, leavetype,null);
      this.leaveService.updateLeave(userType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.leaveForm.reset();
        },);
    }
  }
 
 
  
  displayToastMessage() {
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
