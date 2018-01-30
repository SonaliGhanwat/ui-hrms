import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeetypeService } from '../../services/EmployeeType/employeetype.service';
import { EmployeeType } from '../../models/EmployeeType/EmployeeType.model';
import{CommonService} from '../../services/common service/common.service'
@Component({
  selector: 'app-employee-type',
  templateUrl: './employee-type.component.html',
  styleUrls: ['./employee-type.component.css']
})
export class EmployeeTypeComponent implements OnInit {

  allEmployeetype: EmployeeType[];
  statusCode: number;
  requestProcessing = false;
  employeeTypeIdToUpdate = null;
  processValidation = false;
  collection=[];
  toastMessage:string;
  constructor(private commonService:CommonService,private employeetypeService: EmployeetypeService, private formBuilder: FormBuilder) { }
  employeetypeForm = this.formBuilder.group({
    'type': ['', ([Validators.required])],
    'seekLeave': ['', [Validators.required]],
    'paidLeave': ['', [Validators.required]],
    'totalLeave': ['', [Validators.required]],


  });
  ngOnInit(): void {
    this.getAllEmployeetype();
    this.commonService.onPreviousNextPage();
  }
  getAllEmployeetype() {
    this.employeetypeService.getAllEmployeeTypeList()
      .subscribe(
      data => this.allEmployeetype = data,
      errorCode => this.statusCode = errorCode);
  }
  onEmployeeTypeFormSubmit() {
    this.preProcessConfigurations();
    let type = this.employeetypeForm.get('type').value.trim();
    let seekLeave = this.employeetypeForm.get('seekLeave').value;
    let paidLeave = this.employeetypeForm.get('paidLeave').value;
    let totalLeave = this.employeetypeForm.get('totalLeave').value;
    if (this.employeeTypeIdToUpdate === null) {
      let userType = new EmployeeType(null, type, seekLeave, paidLeave, totalLeave);
      this.employeetypeService.createEmployeeType(userType)
        .subscribe(successCode => {
          let message = successCode.message;
          this.toastMessage = message;
          this.getAllEmployeetype();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
      console.log("successCode");
    } else {
      //Handle update article
      let userType = new EmployeeType(this.employeeTypeIdToUpdate, type, seekLeave, paidLeave, totalLeave);
      this.employeetypeService.updateEmployeeType(userType)
        .subscribe(successCode => {
          let message = successCode.message;
          this.toastMessage = message;
          this.getAllEmployeetype();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deleteEmployeeType(id: string) {
    this.preProcessConfigurations();
    this.employeetypeService.deleteEmployeeTypeById(id)
      .subscribe(successCode => {
        let message = successCode.message;
        this.toastMessage = message;
        this.getAllEmployeetype();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);

  }
  loadEmployeeTypeToEdit(id: string) {
    this.preProcessConfigurations();
    this.employeetypeService.getEmployeeTypeById(id)
      .subscribe(employeeType => {

        this.employeeTypeIdToUpdate = employeeType.id;
        this.employeetypeForm.setValue({ type: employeeType.type, seekLeave: employeeType.seekLeave, paidLeave: employeeType.paidLeave, totalLeave: employeeType.totalLeave });

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
    this.employeeTypeIdToUpdate = null;
    this.employeetypeForm.reset();
    this.processValidation = false;
  }
  toastMessageDisplay(){
    this.commonService.displayMessage();
   }
}
