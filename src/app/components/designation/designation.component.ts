import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DesignationService } from '../../services/Designation/designation.service';
import { Designation } from '../../models/designation/Designation.model';
import { CommonService } from '../../services/common/common.service';
import { DepartmentService } from '../../services/Department/department.service';
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  allDesignation: Designation[];
  allDepartment: any[];
  designationIdToUpdate = null;
  collection = [];
  toastMessage: string;
  constructor(private commonService: CommonService,private departmentService: DepartmentService, private designationService: DesignationService, private formBuilder: FormBuilder) { }
  designationForm = this.formBuilder.group({
    'department': ['', [Validators.required]],
    'name': ['', ([Validators.required])],
    'band': ['', [Validators.required]],
    'level': ['', [Validators.required]],
  });
  ngOnInit(): void {
    this.getAllDesignation();
    this.getAllDepartment();
    this.commonService.onPreviousNextPage();
  }
  getAllDesignation() {
    this.commonService.startLoadingSpinner();
    this.designationService.getAllDesignationList()
      .subscribe(
      data => this.allDesignation = data,);
    this.commonService.hideSpinner();
  }

  getAllDepartment() {
    this.commonService.startLoadingSpinner();
    this.departmentService.getAllDepartmentList()
      .subscribe(
      data => this.allDepartment = data,);
      this.commonService.hideSpinner();
  }
  onDesignationFormSubmit() {
    
    const name = this.designationForm.get('name').value.trim();
    const band = this.designationForm.get('band').value;
    const level = this.designationForm.get('level').value;
    const departmentId = ((document.getElementById('department') as HTMLInputElement).value);
    const department = parseInt(departmentId);
    this.commonService.startLoadingSpinner();
    if (this.designationIdToUpdate === null) {
      const userType = new Designation(null, name, band, level,department);
      this.designationService.createDesignation(userType)
        .subscribe(successCode => {
          this.commonService.hideSpinner();
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllDesignation();
          this.designationForm.reset();
        },);
    } else {
      const designation = new Designation(this.designationIdToUpdate, name, band, level,department);
      this.designationService.updateDesignation(designation)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllDesignation();
          this.designationForm.reset();
        },);
    }
  }
  deleteDesignation(id: string) {
    this.commonService.startLoadingSpinner();
    this.designationService.deleteDesignationById(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.message;
        this.getAllDesignation();
        this.commonService.hideSpinner();
      },);

  }
  loadDesignationToEdit(id: string) {
   
    this.designationService.getDesignationById(id)
      .subscribe(designation => {
        this.designationIdToUpdate = designation.id;
        this.designationForm.setValue({ name: designation.name, band: designation.band, level: designation.level ,department: designation.department.id,});
        
      },);
  }

  clearForm(){
    this.designationForm.reset();
  }
 

  displayToastMessage() {
    this.commonService.displayMessage();
  }
}
