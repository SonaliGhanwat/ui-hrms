import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DesignationService } from '../../services/Designation/designation.service';
import { Designation } from '../../models/designation/Designation.model';
import {CommonService} from '../../services/common service/common.service';
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {

  allDesignation: Designation[];
  statusCode: number;
  requestProcessing = false;
  designationIdToUpdate = null;
  processValidation = false;
  collection = [];
  toastMessage: string;
  constructor (private commonService:CommonService, private designationService: DesignationService, private formBuilder: FormBuilder) { }
  designationForm = this.formBuilder.group({
    'name': ['', ([Validators.required])],
    'band': ['', [Validators.required]],
    'level': ['', [Validators.required]],
  });
  ngOnInit(): void {
    this.getAllDesignation();
    this.commonService.onPreviousNextPage();
  }
  getAllDesignation() {
    this.designationService.getAllDesignationList()
      .subscribe(
      data => this.allDesignation = data,
      errorCode => this.statusCode = errorCode);
  }
  onDesignationFormSubmit() {
    this.preProcessConfigurations();
    const name = this.designationForm.get('name').value.trim();
    const band = this.designationForm.get('band').value;
    const level = this.designationForm.get('level').value;   
    if (this.designationIdToUpdate === null) {
      const userType = new Designation(null, name, band, level);
      this.designationService.createDesignation(userType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllDesignation();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    } else {
      const designation = new Designation(this.designationIdToUpdate,name, band, level);
      this.designationService.updateDesignation(designation)
        .subscribe (successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllDesignation();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deleteDesignation(id: string) {
    this.preProcessConfigurations();
    this.designationService.deleteDesignationById(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.message;
        this.getAllDesignation();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);

  }
  loadDesignationToEdit(id: string) {
    this.preProcessConfigurations();
    this.designationService.getDesignationById(id)
      .subscribe(designation => {
        this.designationIdToUpdate = designation.id;
        this.designationForm.setValue({ name: designation.name, band: designation.band, level: designation.level });
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
    this.designationIdToUpdate = null;
    this.designationForm.reset();
    this.processValidation = false;
  }

  toastMessageDisplay(){
    this.commonService.displayMessage();
   }
}
