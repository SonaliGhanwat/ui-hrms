import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegularizationService } from '../../services/Regularization/regularization.service';
import { Regularization } from '../../models/Regularization/Regularization.model';
import { ValidationService } from '../../services/validation.service';
import { CommonService } from '../../services/common/common.service';
import { Http } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee } from '../../models/Employee/Employee.model';
@Component({
  selector: 'app-regularization',
  templateUrl: './regularization.component.html',
  styleUrls: ['./regularization.component.css']
})
export class RegularizationComponent implements OnInit {
  allRegularization: Regularization[];
  allEmployee: Employee[];
  regularizationIdToUpdate = null; 
  collection = [];
  toastMessage: string;

  constructor(private spinner: Ng4LoadingSpinnerService, private commonService: CommonService, 
    private regularizationService: RegularizationService,private employeeService: EmployeeService, 
    private formBuilder: FormBuilder) {
  }
  regularizationForm = this.formBuilder.group({
    
        'employee': ['', ([Validators.required])],
        'date': ['', ([Validators.required])],
        'totalNumberofHoursworked': ['', [Validators.required]],
        'regularizedHours': ['', [Validators.required]],
        'status': ['', [Validators.required]],
        'reason': ['', [Validators.required]],
        'comments': ['', [Validators.required]],
        
      });

      
  ngOnInit() {
    this.getAllRegularizationList();
    this.getAllEmployeeList();
    this.commonService.onPreviousNextPage();
  }
  getAllRegularizationList() {
    this.commonService.startLoadingSpinner();
    this.regularizationService.getAllRegularization()
      .subscribe(
      data => this.allRegularization = data);
    this.commonService.hideSpinner();
  }
  getAllEmployeeList() {
    this.employeeService.getAllEmployeeList()
      .subscribe(
      data => this.allEmployee = data);
  }
  onRegularizationFormSubmit() {
    
        this.commonService.startLoadingSpinner();
        const employeeId = ((document.getElementById('employee') as HTMLInputElement).value);
        const employee = parseInt(employeeId);
        const date = this.regularizationForm.get('date').value;
        const totalnumberofHoursworked = this.regularizationForm.get('totalNumberofHoursworked').value;
        const regularizedHours = this.regularizationForm.get('regularizedHours').value;
        const status = this.regularizationForm.get('status').value;
        const comments = this.regularizationForm.get('comments').value;
        const reason = ((document.getElementById('reason') as HTMLInputElement).value);
        //const leavetype = parseInt(leaveTypeId);
        if (this.regularizationIdToUpdate === null) {
          const regularization = new Regularization(null, employee, date, totalnumberofHoursworked, regularizedHours, status,comments,reason);
          console.log("regularization:",regularization)
          this.regularizationService.createRegularization(regularization)
            .subscribe(successCode => {
              // let message = successCode.message;
              this.commonService.hideSpinner();
              this.toastMessage = successCode.message;
              this.regularizationForm.reset();
              this.getAllRegularizationList();
            },);
        } else {
          const userType = new Regularization(this.regularizationIdToUpdate, employee, date, totalnumberofHoursworked, regularizedHours, status,comments,reason);
          this.regularizationService.updateRegularization(userType)
            .subscribe(successCode => {
              // let message = successCode.message;
              this.toastMessage = successCode.message;
              this.regularizationForm.reset();
              this.getAllRegularizationList();
    
            },);
        }
      }
      deleteregularization(id: string) {
        
            this.commonService.startLoadingSpinner();
            this.regularizationService.deleteRegularizationById(id)
              .subscribe(successCode => {
                this.getAllRegularizationList();
                // let message = successCode.message;
                this.toastMessage = successCode.message;
              },);
            this.commonService.hideSpinner();
          }
      loadregularizationToEdit(id: string) {
        
            this.commonService.startLoadingSpinner();
            this.regularizationService.getRegularizationById(id)
              .subscribe(data => {
                this.regularizationIdToUpdate = data.id;
                /*if (this.attendanceIdToUpdate != null) {
                  (document.getElementById('employee') as HTMLButtonElement).disabled = true;
                }*/
                // this.userid = data.employee.userid
                this.regularizationForm.setValue({ employee: data.employee.id, date: data.date, totalNumberofHoursworked: data.totalnumberofHoursworked, 
                  regularizedHours: data.regularizedHours,reason: data.reason,status: data.status,comments: data.comments });
             
              },);
            this.commonService.hideSpinner();
          }
      displayToastMessage() {
        this.commonService.displayMessage();
      }
}
