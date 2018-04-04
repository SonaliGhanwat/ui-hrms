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
  selector: 'app-leavebalancereport',
  templateUrl: './leavebalancereport.component.html',
  styleUrls: ['./leavebalancereport.component.css']
})
export class LeavebalancereportComponent implements OnInit {
  allLeave: Leave[];
  statusCode: number;
  requestProcessing = false;
  leaveIdToUpdate = null;
  processValidation = false;
  constructor(private commonService: CommonService, private leaveService: LeaveService, private formBuilder: FormBuilder,
    private employeeService: EmployeeService, private leavetypeService: LeavetypeService) { }

  ngOnInit() {
    this.getAllLeaveBalanceReport();
  }
  getAllLeaveBalanceReport() {
    this.commonService.startLoadingSpinner();
    this.leaveService.getAllLeaveforLeaveBalance()
      .subscribe(
      data => this.allLeave = data,
      errorCode => this.statusCode = errorCode);
      this.commonService.hideSpinner();
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
 
}
