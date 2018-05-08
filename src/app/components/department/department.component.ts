import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../services/Department/department.service';
import { Department } from '../../models/Department/department.model';
import { CommonService } from '../../services/common/common.service';
import { UsertypeService } from '../../services/UserType/usertype.service';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  allDepartment: Department[];
  allUsertypes: any[];
  departmentIdToUpdate = null;
  collection = [];
  toastMessage: string;
  constructor(private commonService: CommonService, private usertypeService: UsertypeService, private departmentService: DepartmentService, private formBuilder: FormBuilder) { }
  departmentForm = this.formBuilder.group({

    'name': ['', ([Validators.required])],

  });
  ngOnInit(): void {
    this.getAllDepartment();
    this.getAllUserTypes();
    this.commonService.onPreviousNextPage();
  }
  getAllDepartment() {
    this.commonService.startLoadingSpinner();
    this.departmentService.getAllDepartmentList()
      .subscribe(
      data => this.allDepartment = data, );
    this.commonService.hideSpinner();
  }

  getAllUserTypes() {
    this.commonService.startLoadingSpinner();
    this.usertypeService.getAllUserTypes()
      .subscribe(
      data => this.allUsertypes = data, );
    this.commonService.hideSpinner();
  }
  onDepartmentFormSubmit() {

    const name = this.departmentForm.get('name').value.trim();

    this.commonService.startLoadingSpinner();
    if (this.departmentIdToUpdate === null) {
      const userType = new Department(null, name);
      this.departmentService.createDepartment(userType)
        .subscribe(successCode => {
          this.commonService.hideSpinner();
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllDepartment();
          this.departmentForm.reset();
          this.commonService.closeForm();
        }, );
    } else {
      const designation = new Department(this.departmentIdToUpdate, name);
      this.departmentService.updateDepartment(designation)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllDepartment();
          this.departmentForm.reset();
          this.commonService.closeForm();
        }, );
    }
  }
  deleteDepartment(id: string) {
    this.commonService.startLoadingSpinner();
    this.departmentService.deleteDepartmentById(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.message;
        this.getAllDepartment();
        this.commonService.hideSpinner();
      }, );

  }
  loadDepartmentToEdit(id: string) {

    this.departmentService.getDepartmentById(id)
      .subscribe(department => {
        this.departmentIdToUpdate = department.id;
        this.departmentForm.setValue({ name: department.name });

      }, );
  }

  clearForm() {
    this.departmentForm.reset();
  }
  displayToastMessage() {
    this.commonService.displayMessage();
  }

}
