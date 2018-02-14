import { Component, OnInit } from '@angular/core';
import { Leave } from '../../models/Leave/Leave.model';
import { ApprovalsService } from '../../services/Approvals/approvals.service';
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
  constructor(private approvalsService: ApprovalsService) { }

  ngOnInit() {
    this.getAllLeaveList()
  }
  getAllLeaveList() {
    this.approvalsService.getAllLeaveByStatus()
      .subscribe(
      data => this.allLeave = data,
      errorCode => this.statusCode = errorCode);
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
 
}
