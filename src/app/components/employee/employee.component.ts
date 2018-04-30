import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee } from '../../models/Employee/Employee.model';
import { EmployeetypeService } from '../../services/EmployeeType/employeetype.service';
import { EmployeeType } from '../../models/EmployeeType/EmployeeType.model';
import { UsertypeService } from '../../services/UserType/usertype.service';
import { UserType } from '../../models/UserType/UserType.model';
import { DesignationService } from '../../services/Designation/designation.service';
import { Designation } from '../../models/designation/Designation.model';
import { ValidationService } from '../../services/validation.service';
import { CommonService } from '../../services/common/common.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DepartmentService } from '../../services/Department/department.service';
import { Department } from '../../models/Department/department.model';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  allEmployee: Employee[];
  allEmployeetype: EmployeeType[];
  allUsertypes: UserType[];
  allDesignation: Designation[];
  allDepartment: Department[];
  employeeIdToUpdate = null;

  collection = [];
  toastMessage: string;
  selectMenu: Employee[];
  firstName: Employee[];
  myCookie:any;
  exdays:any;
  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder,
    private employeetypeService: EmployeetypeService, private usertypeService: UsertypeService,
    private designationService: DesignationService, private commonService: CommonService,
    private departmentService: DepartmentService) { }
  employeeForm = this.formBuilder.group({
    'userid': ['', ([Validators.required, Validators.minLength(4), Validators.pattern(/[a-zA-Z0-9]/)])],
    'password': ['', [Validators.required, Validators.minLength(4)]],
    'firstName': ['', [Validators.required]],
    'lastName': ['', [Validators.required]],
    'phoneNumber': ['', ([Validators.required])],
    'emailid': ['', [Validators.required]],
    'dateOfJoining': ['', [Validators.required,ValidationService.dateOfJoiningValidation]],
    'dateOfBirth': ['', [Validators.required, ValidationService.dateOfBirthValidation]],
    'address': ['', ([Validators.required])],
    'department': ['', [Validators.required]],
    'salary': ['', [Validators.required]],
    'employeetype': ['', [Validators.required]],
    'usertype': ['', [Validators.required]],
    'designation': ['', [Validators.required]],
    'reportTo': ['', [Validators.required]],

  });
  ngOnInit(): void {
    this.getAllEmployee();
    this.getAllEmployeetype();
    this.getAllUserTypes();
    this.getAllDepartment();
    this.commonService.onPreviousNextPage();
  }
  getAllEmployee() {
    this.employeeService.getAllEmployeeList()
      .subscribe(
      data => this.allEmployee = data);
  }
  getAllEmployeetype() {
    this.commonService.startLoadingSpinner();
    this.employeetypeService.getAllEmployeeTypeList()
      .subscribe(
      data => this.allEmployeetype = data,);
    this.commonService.hideSpinner();
  }
  getAllUserTypes() {
    this.usertypeService.getAllUserTypes()
      .subscribe(
      data => this.allUsertypes = data,);
  }
  getAllDepartment() {
    this.departmentService.getAllDepartmentList()
      .subscribe(
      data => this.allDepartment = data,);
  }
  getAllDesignation(department: number) {
    const departmentId = ((document.getElementById('department') as HTMLInputElement).value);
    department = parseInt(departmentId);
    this.designationService.designationListByDepartmentId(department)
      .subscribe(
      data => this.allDesignation = data,);
  }
  onEmployeeFormSubmit() {
 
    const userid = this.employeeForm.get('userid').value;
    const password = this.employeeForm.get('password').value;
    const firstName = this.employeeForm.get('firstName').value;
    const lastName = this.employeeForm.get('lastName').value;
    const phoneNumber = this.employeeForm.get('phoneNumber').value;
    const emailid = this.employeeForm.get('emailid').value;
    const dateOfJoining = this.employeeForm.get('dateOfJoining').value;
    const dateOfBirth = this.employeeForm.get('dateOfBirth').value;
    const address = this.employeeForm.get('address').value;
    //const department = this.employeeForm.get('department').value;
    const departmentId = ((document.getElementById('department') as HTMLInputElement).value);
    const department = parseInt(departmentId);
    const salary = this.employeeForm.get('salary').value;
    const usertypeId = ((document.getElementById('userType') as HTMLInputElement).value);
    const usertype = parseInt(usertypeId);
    const employeetypeId = ((document.getElementById('employeetype') as HTMLInputElement).value);
    const employeetype = parseInt(employeetypeId);
    const reportToId = ((document.getElementById('reportTo') as HTMLInputElement).value);
    const reportTo = parseInt(reportToId);
    const designationId = ((document.getElementById('designation') as HTMLInputElement).value);
    const designation = parseInt(designationId);
    this.commonService.startLoadingSpinner();
    if (this.employeeIdToUpdate === null) {
      const attendance = new Employee(null, userid, password, firstName, lastName, phoneNumber, emailid, dateOfJoining, dateOfBirth, address, department, salary, reportTo, usertype, employeetype, designation);
      this.employeeService.createEmployee(attendance)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.commonService.hideSpinner();
          this.toastMessage = successCode.message;
          this.getAllEmployee();
          this.employeeForm.reset();
          this.commonService.closeForm();
        },);
    } else {
      const userType = new Employee(this.employeeIdToUpdate, userid, password, firstName, lastName, phoneNumber, emailid, dateOfJoining, dateOfBirth, address, department, salary, reportTo, usertype, employeetype, designation);
      this.employeeService.updateEmployee(userType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllEmployee();
          this.employeeForm.reset();
          this.commonService.closeForm();
        },);
    }
    this.commonService.hideSpinner();
  }
  deleteEmployee(id: string) {
    this.commonService.startLoadingSpinner();
    this.employeeService.deleteEmployeeById(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.message;
        this.getAllEmployee();
        this.commonService.hideSpinner();
      },);
  }
  reportTo(designation: number) {
    const designationId = ((document.getElementById('designation') as HTMLInputElement).value);
    designation = parseInt(designationId);
    
    this.employeeService.employeeForReportTo(designation)
      .subscribe(
      data => this.selectMenu = data.data,);
    /*.subscribe(successCode => {
      console.log("successCode:",successCode)
      let selectMenu="";
      //selectMenu+='<option value=""></option>'+"<br>";
      for(var i = 0; i < successCode.data.length; i++) {
       selectMenu+='<option value="'+successCode.data[i].id +'">'+successCode.data[i].firstName+' '+successCode.data[i].lastName +' ('+successCode.data[i].userid +')</option>'+"<br>";  
      }
      selectMenu+='</select>';
      console.log("selectMenu:",selectMenu);
      document.getElementById("reportto").innerHTML = selectMenu;
      this.statusCode = successCode;
      this.getAllEmployee();
      this.backToCreateArticle();
    },
    errorCode => this.statusCode = errorCode);*/
  }
  loadEmployeeToEdit(id: string) {
 
    this.commonService.startLoadingSpinner();
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
          department: data.department.id,
          salary: data.salary,
          employeetype: data.employeetype.id,
          usertype: data.usertype.id,
          designation: data.designation.id,
          reportTo: data.reportTo
        });
     
      },);
      this.commonService.hideSpinner();
  }
  displayToastMessage() {
    this.commonService.displayMessage();
  }
  clearForm(){
    this.employeeForm.reset();
  }
}
