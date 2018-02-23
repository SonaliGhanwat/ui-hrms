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
  statusCode: number
  getStatus:any;
  userid:any;
  checkboxValue : any;
  logvalue = '';
  toastMessage: string;
   checked: string[] = [];
  approvalStatus = [
    { id: 1, name: "Pending" },
    { id: 2, name: "Approved" },
    { id: 3, name: "Rejected" }

  ];
  //selectedStatus: any;
  constructor(private approvalsService: ApprovalsService, private formBuilder: FormBuilder, private commonService: CommonService) { }
  


  ngOnInit() {
    this.getAllLeaveList()
   
  }
  getAllLeaveList() {
    this.approvalsService.getAllLeaveByStatus()
    .subscribe(
      data => {
        this.allLeave = data.data
        let code = data.code
        console.log("code:",code)
        if(code==1){
           document.getElementById('data').innerHTML = "There is no any request for Leave Approval"
        }
      },
      errorCode => this.statusCode = errorCode);      
  }

  onSubmitApprovalStatus() {
    let status = this.getStatus;
    console.log("status:", status);
    //this.checkboxValue = this.checked;
   // console.log("this.checkboxValue:", this.checkboxValue);
    let check = `[{"id":  ${this.userid }}]`;
    let empLeaveDtos = JSON.parse(check);   
    console.log("empLeaveDtos:", empLeaveDtos);
    let attendance = new Approval(status, empLeaveDtos);
    console.log("attendance0", attendance)
    this.approvalsService.updateLeaveStatus(attendance)
      .subscribe(successCode => {
        let message = successCode.message;
        console.log("message", message);
        document.getElementById("response").innerHTML = message;
        this.getAllLeaveList();
      },
      errorCode => this.statusCode = errorCode);
    console.log("successCode");
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
  onSelect(statusId,option) {
    this.getStatus = statusId
    console.log(" this.status:", this.getStatus);
    this.userid = option
    //console.log(" this.userid:", this.userid);
  }
 
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  toastMessageDisplay() {
    this.commonService.displayMessage();
  }
}
