import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/Leave/leave.service';
import { Leave } from '../../models/Leave/Leave.model';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee } from '../../models/Employee/Employee.model';
import { LeavetypeService } from '../../services/LeaveType/leavetype.service'
import { LeaveType } from '../../models/LeaveType/Leavetype.model';
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
  articleIdToUpdate = null;
  processValidation = false;
  constructor(private leaveService: LeaveService, private formBuilder: FormBuilder,
    private employeeService: EmployeeService, private leavetypeService: LeavetypeService) { }
  leaveForm = this.formBuilder.group({
    'employee': ['', ([Validators.required])],
    'subject': ['', ([Validators.required])],
    'fromDate': ['', [Validators.required]],
    'toDate': ['', [Validators.required]],
    'leavetype': ['', ([Validators.required])],


  });

  ngOnInit(): void {
    this.getAllLeaveList();
    this.getAllEmployeeList();
    this.getAllLeaveTypes();
  }
  getAllLeaveList() {
    this.leaveService.getAllLeave()
      .subscribe(
      data => this.allLeave = data,
      errorCode => this.statusCode = errorCode);
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
    let employeeId = this.leaveForm.get('employee').value.trim();
    let employee = parseInt(employeeId);

    let subject = this.leaveForm.get('subject').value;

    let fromDate = this.leaveForm.get('fromDate').value;

    let toDate = this.leaveForm.get('toDate').value;

    let leaveTypeId = this.leaveForm.get('leavetype').value.trim();

    let leavetype = parseInt(leaveTypeId);

    if (this.articleIdToUpdate === null) {
      let attendance = new Leave(null, employee, subject, fromDate, toDate, leavetype);
      console.log("attendance0", attendance)
      this.leaveService.createLeave(attendance)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllLeaveList();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
      console.log("successCode");
    } else {
      //Handle update article
      let userType = new Leave(this.articleIdToUpdate, employee, subject, fromDate, toDate, leavetype);
      this.leaveService.updateLeave(userType)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllLeaveList();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deleteLeave(id: string) {
    this.preProcessConfigurations();
    this.leaveService.deleteLeaveById(id)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllLeaveList();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);

  }
  loadLeaveToEdit(id: string) {
    this.preProcessConfigurations();
    this.leaveService.getLeaveById(id)
      .subscribe(data => {

        this.articleIdToUpdate = data.id;
        this.leaveForm.setValue({ employee: data.employee, subject: data.subject, fromDate: data.fromDate, toDate: data.toDate });

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
    this.articleIdToUpdate = null;
    this.leaveForm.reset();
    this.processValidation = false;
  }

}
