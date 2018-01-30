import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/Leave/leave.service';
import { Leave } from '../../models/Leave/Leave.model';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee } from '../../models/Employee/Employee.model';
import { LeavetypeService } from '../../services/LeaveType/leavetype.service'
import { LeaveType } from '../../models/LeaveType/Leavetype.model';
import { ValidationService } from '../../services/validation.service';
import{CommonService} from '../../services/common service/common.service'
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
  toastMessage:string;
  constructor( private commonService:CommonService,private leaveService: LeaveService, private formBuilder: FormBuilder,
    private employeeService: EmployeeService, private leavetypeService: LeavetypeService) { }
  leaveForm = this.formBuilder.group({
    'employee': ['', ([Validators.required])],
    'subject': ['', ([Validators.required])],
    'fromDate': ['', [Validators.required,ValidationService.dateValidation]],
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

    if (this.leaveIdToUpdate === null) {
      let attendance = new Leave(null, employee, subject, fromDate, toDate, leavetype);
      console.log("attendance0", attendance)
      this.leaveService.createLeave(attendance)
        .subscribe(successCode => {
          let message = successCode.message;
          this.toastMessage = message;
          this.getAllLeaveList();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
      console.log("successCode");
    } else {
      //Handle update article
      let userType = new Leave(this.leaveIdToUpdate, employee, subject, fromDate, toDate, leavetype);
      this.leaveService.updateLeave(userType)
        .subscribe(successCode => {
          let message = successCode.message;
          this.toastMessage = message;
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
        let message = successCode.message;
        this.toastMessage = message;
        this.getAllLeaveList();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);

  }
  loadLeaveToEdit(id: string) {
    this.preProcessConfigurations();
    this.leaveService.getLeaveById(id)
      .subscribe(data => {

        this.leaveIdToUpdate = data.id;
        this.leaveForm.setValue({ employee: data.employee, subject: data.subject, fromDate: data.fromDate, toDate: data.toDate,leavetype: data.leavetype });

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
  toastMessageDisplay(){
    this.commonService.displayMessage();
   }
   toDateValidation(){
    let fromDate = this.leaveForm.get('fromDate').value;
    let toDate = this.leaveForm.get('toDate').value;
    if (fromDate <= toDate) {
      console.log("if block")
    } else if(toDate <= fromDate){
      document.getElementById("afterleavejoiningdate_validation").innerHTML = "Invalid Date!! After leave joining date  should be greater then Leave date";
      return false;
    }
    document.getElementById("afterleavejoiningdate_validation").innerHTML =""
    return true;
   }
}
