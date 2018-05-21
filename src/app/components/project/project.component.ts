import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/Project/project.service';
import { ProjectModel } from '../../models/Project/project.model';
import { ValidationService } from '../../services/validation.service';
import { CommonService } from '../../services/common/common.service';
import { Http } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import * as XLSX from 'ts-xlsx';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  allProject: ProjectModel[];
  projectIdToUpdate = null;
  collection = [];
  toastMessage: string;
  constructor(private spinner: Ng4LoadingSpinnerService, private commonService: CommonService,
    private projectService: ProjectService, private formBuilder: FormBuilder) {
  }
  projectForm = this.formBuilder.group({

    'name': ['', ([Validators.required])],
    'startDate': ['', ([Validators.required])],
    'endDate': ['', [Validators.required]],
    'projecttype': ['', [Validators.required]],
  });


  ngOnInit() {
    this.getAllProjectList();
  }
  validate() {
    Object.keys(this.projectForm.controls).forEach(field => {
      const control = this.projectForm.get(field);
      control.markAsTouched({ onlySelf: true });

    });
  }

  getAllProjectList() {
    this.commonService.startLoadingSpinner();
    this.projectService.getAllProject()
      .subscribe(
      data => this.allProject = data);
    this.commonService.hideSpinner();
  }
  onProjectFormSubmit() {
    this.commonService.startLoadingSpinner();
    const name = this.projectForm.get('name').value.trim();
    const startDate = this.projectForm.get('startDate').value;
    const endDate = this.projectForm.get('endDate').value;
    const projecttype = this.projectForm.get('projecttype').value;
    if (this.projectIdToUpdate === null) {
      const project = new ProjectModel(null, name, startDate, endDate, projecttype);
      this.projectService.createProject(project)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.commonService.hideSpinner();
          this.toastMessage = successCode.message;
          this.getAllProjectList();
          this.projectForm.reset();
          this.commonService.closeForm();
        }, );
    } else {
      const project = new ProjectModel(this.projectIdToUpdate, name, startDate, endDate, projecttype);
      this.projectService.updateProject(project)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllProjectList();
          this.projectForm.reset();
          this.commonService.closeForm();
        }, );
    }
  }
  deleteProject(id: string) {
    this.commonService.startLoadingSpinner();
    this.projectService.deleteProjectById(id)
      .subscribe(successCode => {
        this.getAllProjectList();
        // let message = successCode.message;
        this.toastMessage = successCode.message;
      }, );
    this.commonService.hideSpinner();
  }
  loadProjectToEdit(id: string) {
    
        this.commonService.startLoadingSpinner();
        this.projectService.getProjectById(id)
          .subscribe(data => {
            this.projectIdToUpdate= data.id;
            /*if (this.attendanceIdToUpdate != null) {
              (document.getElementById('employee') as HTMLButtonElement).disabled = true;
            }*/
            // this.userid = data.employee.userid
            this.projectForm.setValue({ name: data.name, startDate: data.startDate, endDate: data.endDate, projecttype: data.projecttype });
    
          }, );
        this.commonService.hideSpinner();
      } 
      displayToastMessage() {
        this.commonService.displayMessage();
      }
  clearForm() {
    this.projectForm.reset();
  }
}
