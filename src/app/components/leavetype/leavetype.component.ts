import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LeavetypeService }from '../../services/LeaveType/leavetype.service'
import { LeaveType } from'../../models/LeaveType/Leavetype.model';

@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrls: ['./leavetype.component.css']
})
export class LeavetypeComponent implements OnInit {

  allLeavetypes: LeaveType[];
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;

  constructor(private leavetypeService: LeavetypeService, private formBuilder: FormBuilder) { }
  leavetypeForm = this.formBuilder.group({
    'name': ['', ([Validators.required])]

  });

  ngOnInit(): void {
    this.getAllLeaveTypes();
  }
  getAllLeaveTypes() {
    this.leavetypeService.getAllLeaveTypeList()
      .subscribe(
      data => this.allLeavetypes = data,
      errorCode => this.statusCode = errorCode);
  }
  onLeaveTypeFormSubmit() {
    this.preProcessConfigurations();
    let name = this.leavetypeForm.get('name').value.trim();
   
    if (this.articleIdToUpdate === null) {

      let leaveType = new LeaveType(null, name);
      this.leavetypeService.createLeaveType(leaveType)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllLeaveTypes();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
      console.log("successCode");
    } else {
      //Handle update article
      let leaveType = new LeaveType(this.articleIdToUpdate, name);
      this.leavetypeService.updateLeaveType(leaveType)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllLeaveTypes();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deleteLeaveType(id: string) {
    this.preProcessConfigurations();
    this.leavetypeService.deleteLeaveType(id)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllLeaveTypes();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);

  }
  loadLeaveTypeToEdit(id: string) {
    this.preProcessConfigurations();
    this.leavetypeService.getLeaveTypeById(id)
      .subscribe(leaveType => {

        this.articleIdToUpdate = leaveType.id;
        this.leavetypeForm.setValue({ name: leaveType.name});
        
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
    this.leavetypeForm.reset();
    this.processValidation = false;
  }

}


