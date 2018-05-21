import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee } from '../../models/Employee/Employee.model';
import { ValidationService } from '../../services/validation.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  allEmployee: Employee[];
  employeeIdToUpdate = null;
  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder) { }
  employeeForm = this.formBuilder.group({
    'userid': [{ value: '', disabled: true }],
    'password': [{ value: '', disabled: true }],
    'firstName': [{ value: '', disabled: true }],
    'lastName': [{ value: '', disabled: true }],
    'phoneNumber': [{ value: '', disabled: true }],
    'emailid': [{ value: '', disabled: true }],
    'dateOfJoining': [{ value: '', disabled: true }],
    'dateOfBirth': [{ value: '', disabled: true }],
    'address': [{ value: '', disabled: true }],
    'salary': [{ value: '', disabled: true }],


  });
  ngOnInit() {
    this.getAllEmployeeByUserId();
  }
  getAllEmployeeByUserId() {
    this.employeeService.getAllEmployeeByReprotToList()
      .subscribe(
      data => {
        this.allEmployee = data.data;
        const code = data.code;
        console.log('code:', code);
        if (code === 0) {
          document.getElementById('data').innerHTML = 'There is no any Profile for view';
        } else {
          document.getElementById('data').innerHTML = '';
        }
      }, );
  }
  loadEmployeeToEdit(id: string) {

    // this.commonService.startLoadingSpinner();
    this.employeeService.getEmployeeById(id)
      .subscribe(data => {
        this.employeeIdToUpdate = data.id;
        this.employeeForm.setValue({
          userid: data.userid,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          emailid: data.emailid,
          dateOfJoining: data.dateOfJoining,
          dateOfBirth: data.dateOfBirth,
          address: data.address,
          salary: data.salary,
        });
      }, );
    //this.commonService.hideSpinner();
  }
}
