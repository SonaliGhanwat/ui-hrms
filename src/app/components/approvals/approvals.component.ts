import { Component, OnInit } from '@angular/core';
import { Leave } from '../../models/Leave/Leave.model';
import { Approval } from '../../models/Approvals/Approval.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApprovalsService } from '../../services/Approvals/approvals.service';
import { CommonService } from '../../services/common/common.service';

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
  getStatus: any;
  userid: any;
  checkboxValue: any;
  logvalue = '';
  toastMessage: string;
  checked: string[] = [];
  /*(approvalStatus = [
    { id: 1, name: "Pending" },
    { id: 2, name: "Approved" },
    { id: 3, name: "Rejected" }

  ];*/
  constructor(private approvalsService: ApprovalsService, private formBuilder: FormBuilder, private commonService: CommonService) { }
  ngOnInit() {
    this.getAllLeaveList();
  }
  getAllLeaveList() {
    this.approvalsService.getAllLeaveByStatus()
      .subscribe(
      data => {
        this.allLeave = data.data;
        const code = data.code;
        console.log('code:',code);
        if (code === 1) {
          document.getElementById('data').innerHTML = 'There is no any request for Leave Approval';
        }
      },
      errorCode => this.statusCode = errorCode);
  }
  onSubmitApprovalStatus() {
    const status = this.getStatus;
    //let check = `[{'id':  ${this.userid}}]`;
    //let empLeaveDtos = JSON.parse(check);
    let id = this.userid;
    this.commonService.startLoadingSpinner();
    const attendance = new Approval(status, id);
    console.log('attendance:',attendance)
    this.approvalsService.updateLeaveStatus(attendance)
    
      .subscribe(successCode => {
        this.commonService.hideSpinner();
        // let message = successCode.message;
        document.getElementById('response').innerHTML = successCode.message;
        this.getAllLeaveList();
      },
      errorCode => this.statusCode = errorCode);
      this.commonService.hideSpinner();
  }
  /*logCheckbox(logid): void {
    // this.log += `{"id":  ${element.value}}`;
     console.log("logid:", logid) 
     for (var i = 0; i < this.allLeave.length; i++) {
       if (this.allLeave[i].id == logid) {
         this.log = this.allLeave[i].id;
         console.log("this.log:", this.log)
         this.logvalue += `{"id":  ${this.log}}`
         console.log("this.logvalue:", this.logvalue)
       }
     }
   }
   updateChecked(option, event) {
     console.log('option',option,);
     var index = this.checked.indexOf(option);
     console.log('index ' ,index);
     if(event.target.checked) {
       console.log('add');
       if(index === -1) { 
         this.checked.push(`{"id":  ${option}}`); 
       }
     } else {
       console.log('remove');
       if(index !== -1) {
         this.checked.splice(index, 1);
       }
     }
     console.log("this.logvalue:",this.checked);
   }
 
   onSelect(statusId) {
     //this.selectedStatus = null;
     console.log("statusId:",statusId);
     for (var i = 0; i < this.approvalStatus.length; i++) {
       if (this.approvalStatus[i].id == statusId) {
         this.selectedStatus = this.approvalStatus[i];
         console.log("selectedStatus:", this.selectedStatus)
       }
     }
   }*/
  onSelect(statusId, option) {
    this.getStatus = statusId;
    this.userid = option;
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  toastMessageDisplay() {
    this.commonService.displayMessage();
  }
}
