import { Component, OnInit } from '@angular/core';
import { Leave } from '../../models/Leave/Leave.model';
import { Approval } from '../../models/Approvals/Approval.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApprovalsService } from '../../services/Approvals/approvals.service';
import { CommonService } from '../../services/common service/common.service'
@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {

  allLeave: Leave[];
  requestProcessing = false;
  processValidation = false;
  statusCode: number;
  show = false;
  log = '';
  checkboxValue = '';
  toastMessage: string;
  approvalStatus = [
    { id: 1, name: "Pending" },
    { id: 2, name: "Approved" },
    { id: 3, name: "Rejected" }

  ];
  selectedStatus: any;
  constructor(private approvalsService: ApprovalsService, private formBuilder: FormBuilder, private commonService: CommonService) { }
  


  ngOnInit() {
    this.getAllLeaveList()
  }
  getAllLeaveList() {
    this.approvalsService.getAllLeaveByStatus()
      .subscribe(
      data => this.allLeave = data,
      errorCode => this.statusCode = errorCode);
  }

  onSubmitApprovalStatus() {

    let status = this.selectedStatus.name
    console.log("status:", status);
    this.checkboxValue = this.log;
    let check = `[${this.checkboxValue} ] `;
    let empLeaveDtos = JSON.parse(check, )
    console.log("empLeaveDtos:", empLeaveDtos);
    let attendance = new Approval(status, empLeaveDtos);
    console.log("attendance0", attendance)
    this.approvalsService.updateLeaveStatus(attendance)
      .subscribe(successCode => {
        let message = successCode.message;
        console.log("message", message);

      },
      errorCode => this.statusCode = errorCode);
    console.log("successCode");
  }
  logCheckbox(element: HTMLInputElement): void {
    this.log += `{"id":  ${element.value}}`;
    console.log("this.log:", this.log)
  }
  onSelect(statusId) {
    //this.selectedStatus = null;
    for (var i = 0; i < this.approvalStatus.length; i++) {
      if (this.approvalStatus[i].id == statusId) {
        this.selectedStatus = this.approvalStatus[i];
        console.log("selectedStatus:", this.selectedStatus)
      }
    }
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  toastMessageDisplay() {
    this.commonService.displayMessage();
  }
}
