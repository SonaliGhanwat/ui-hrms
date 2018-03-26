import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LeavetypeService } from '../../services/LeaveType/leavetype.service';
import { LeaveType } from '../../models/LeaveType/Leavetype.model';
import { CommonService } from '../../services/common/common.service';
@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.css']
})
export class LeavetypeComponent implements OnInit {
  allLeavetypes: LeaveType[];
  statusCode: number;
  requestProcessing = false;
  leaveTypeIdToUpdate = null;
  processValidation = false;
  collection = [];
  toastMessage: string;
  constructor(private commonService: CommonService, private leavetypeService: LeavetypeService, private formBuilder: FormBuilder) { }
  leavetypeForm = this.formBuilder.group({
    'name': ['', ([Validators.required])]
  });
  ngOnInit(): void {
    this.getAllLeaveTypes();
    this.commonService.onPreviousNextPage();
  }
  getAllLeaveTypes() {
    this.commonService.startLoadingSpinner();
    this.leavetypeService.getAllLeaveTypeList()
      .subscribe(
      data => this.allLeavetypes = data,
      errorCode => this.statusCode = errorCode);
      this.commonService.hideSpinner();
  }
  onLeaveTypeFormSubmit() {
    this.preProcessConfigurations();
    this.commonService.startLoadingSpinner();
    const name = this.leavetypeForm.get('name').value.trim();
    if (this.leaveTypeIdToUpdate === null) {
      const leaveType = new LeaveType(null, name);
      this.leavetypeService.createLeaveType(leaveType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.commonService.hideSpinner();
          this.toastMessage = successCode.message;
          this.getAllLeaveTypes();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    } else {
      const leaveType = new LeaveType(this.leaveTypeIdToUpdate, name);
      this.leavetypeService.updateLeaveType(leaveType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllLeaveTypes();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deleteLeaveType(id: string) {
    this.commonService.startLoadingSpinner();
    this.preProcessConfigurations();
    this.leavetypeService.deleteLeaveType(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.messag;
        this.getAllLeaveTypes();
        this.backToCreateArticle();
        this.commonService.hideSpinner();
      },
      errorCode => this.statusCode = errorCode);
  }
  loadLeaveTypeToEdit(id: string) {
    this.preProcessConfigurations();
    this.leavetypeService.getLeaveTypeById(id)
      .subscribe(leaveType => {
        this.leaveTypeIdToUpdate = leaveType.id;
        this.leavetypeForm.setValue({ name: leaveType.name });
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
    this.leaveTypeIdToUpdate = null;
    this.leavetypeForm.reset();
    this.processValidation = false;
  }
  toastMessageDisplay() {
    this.commonService.displayMessage();
  }
}


