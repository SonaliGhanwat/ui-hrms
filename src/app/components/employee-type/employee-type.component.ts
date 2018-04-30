import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeetypeService } from '../../services/EmployeeType/employeetype.service';
import { EmployeeType } from '../../models/EmployeeType/EmployeeType.model';
import { CommonService } from '../../services/common/common.service';
@Component({
  selector: 'app-employee-type',
  templateUrl: './employee-type.component.html',
  styleUrls: ['./employee-type.component.css']
})
export class EmployeeTypeComponent implements OnInit {

  allEmployeetype: EmployeeType[];
  employeeTypeIdToUpdate = null;
  processValidation = false;
  collection = [];
  toastMessage: string;
  totalLeav: any;
  constructor(private commonService: CommonService, private employeetypeService: EmployeetypeService, private formBuilder: FormBuilder) { }
  employeetypeForm = this.formBuilder.group({
    'type': ['', ([Validators.required])],
    'seekLeave': ['', [Validators.required]],
    'paidLeave': ['', [Validators.required]],
    // 'totalLeave': ['', [Validators.required]],


  });
  ngOnInit(): void {
    this.getAllEmployeetype();
    this.commonService.onPreviousNextPage();
  }
  getAllEmployeetype() {
    this.commonService.startLoadingSpinner();
    this.employeetypeService.getAllEmployeeTypeList()
      .subscribe(
      data => this.allEmployeetype = data,);
      this.commonService.hideSpinner();
  }
  onEmployeeTypeFormSubmit() {
    this.commonService.startLoadingSpinner();
    const type = this.employeetypeForm.get('type').value.trim();
    const seekLeave = this.employeetypeForm.get('seekLeave').value;
    const paidLeave = this.employeetypeForm.get('paidLeave').value;
    const totalLeave1 = sessionStorage.getItem('totalleaves');
    const totalLeave = parseInt(totalLeave1);
    if (this.employeeTypeIdToUpdate === null) {
      const userType = new EmployeeType(null, type, seekLeave, paidLeave, totalLeave);
      this.employeetypeService.createEmployeeType(userType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.commonService.hideSpinner();
          this.toastMessage = successCode.message;
          this.getAllEmployeetype();
          this.employeetypeForm.reset();
          this.commonService.closeForm();
        },);
    } else {
      const userType = new EmployeeType(this.employeeTypeIdToUpdate, type, seekLeave, paidLeave, totalLeave);
      this.employeetypeService.updateEmployeeType(userType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllEmployeetype();
          this.employeetypeForm.reset();
          this.commonService.closeForm();
        },);
    }
  }
  deleteEmployeeType(id: string) {
    this.commonService.startLoadingSpinner();
    this.employeetypeService.deleteEmployeeTypeById(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.message;
        this.getAllEmployeetype();
        this.commonService.hideSpinner();
      },);

  }
  loadEmployeeTypeToEdit(id: string) {
    this.employeetypeService.getEmployeeTypeById(id)
      .subscribe(employeeType => {
        this.employeeTypeIdToUpdate = employeeType.id;
        this.employeetypeForm.setValue({ type: employeeType.type, seekLeave: employeeType.seekLeave, paidLeave: employeeType.paidLeave, totalLeave: employeeType.totalLeave });   
      },);
  }
  totalLeave() {
    const seekLeave = this.employeetypeForm.get('seekLeave').value;
    const paidLeave = this.employeetypeForm.get('paidLeave').value;
    const total = seekLeave + paidLeave;
    this.totalLeav = total;
    const leave = document.getElementById('totalLeave').innerHTML = this.totalLeav;
    sessionStorage.setItem('totalleaves', leave);
  }
  clearForm(){
    this.employeetypeForm.reset();
  }
  
  displayToastMessage() {
    this.commonService.displayMessage();
  }
}
