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
  leaveTypeIdToUpdate = null;
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
      data => this.allLeavetypes = data, );
    this.commonService.hideSpinner();
  }
  onLeaveTypeFormSubmit() {
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
          this.leavetypeForm.reset();
          this.commonService.closeForm();
        }, );
    } else {
      const leaveType = new LeaveType(this.leaveTypeIdToUpdate, name);
      this.leavetypeService.updateLeaveType(leaveType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllLeaveTypes();
          this.leavetypeForm.reset();
          this.commonService.closeForm();
        }, );
    }
  }
  deleteLeaveType(id: string) {
    this.commonService.startLoadingSpinner();
    this.leavetypeService.deleteLeaveType(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.messag;
        this.getAllLeaveTypes();
        this.commonService.hideSpinner();
      }, );
  }
  loadLeaveTypeToEdit(id: string) {
    this.leavetypeService.getLeaveTypeById(id)
      .subscribe(leaveType => {
        this.leaveTypeIdToUpdate = leaveType.id;
        this.leavetypeForm.setValue({ name: leaveType.name });
      }, );
  }

  clearForm() {
    this.leavetypeForm.reset();
  }
  displayToastMessage() {
    this.commonService.displayMessage();
  }
}


