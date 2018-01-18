import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee} from '../../models/Employee/Employee.model';
import { EmployeetypeService } from '../../services/EmployeeType/employeetype.service';
import { EmployeeType } from '../../models/EmployeeType/EmployeeType.model';
import { UsertypeService } from '../../services/UserType/usertype.service';
import { UserType } from '../../models/UserType/UserType.model';
import { DesignationService } from '../../services/Designation/designation.service';
import { Designation } from '../../models/designation/Designation.model';
import { ValidationService } from '../../services/validation.service';

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
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;
  

  constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder,
    private employeetypeService: EmployeetypeService,private usertypeService: UsertypeService,
    private designationService: DesignationService,) { }
  employeeForm = this.formBuilder.group({
    'userid': ['', ([Validators.required])],
    'password': ['', [Validators.required]],
    'firstName': ['', [Validators.required]],
    'lastName': ['', [Validators.required]],
    'phoneNumber': ['', ([Validators.required])],
    'emailid': ['', [Validators.required,ValidationService.emailValidator]],
    'dateOfJoining': ['', [Validators.required]],
    'dateOfBirth': ['', [Validators.required,ValidationService.dateOfBirthValidation]],
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
    this.getAllDesignation();
  }
  getAllEmployee() {
    this.employeeService.getAllEmployeeList()
      .subscribe(
      data => this.allEmployee = data,
      errorCode => this.statusCode = errorCode);
  }
  getAllEmployeetype() {
    this.employeetypeService.getAllEmployeeTypeList()
      .subscribe(
      data => this.allEmployeetype = data,
      errorCode => this.statusCode = errorCode);
     
  }
  getAllUserTypes() {
    this.usertypeService.getAllUserTypes()
      .subscribe(
      data => this.allUsertypes = data,
      errorCode => this.statusCode = errorCode);
  }
  getAllDesignation() {
    this.designationService.getAllDesignationList()
      .subscribe(
      data => this.allDesignation = data,
      errorCode => this.statusCode = errorCode);
  }
  onEmployeeFormSubmit() {
    this.preProcessConfigurations();
    let userid = this.employeeForm.get('userid').value;
    console.log("userid",userid);
    let password = this.employeeForm.get('password').value;
    console.log("password",password);
    let firstName = this.employeeForm.get('firstName').value;
    console.log("firstName",firstName);
    let lastName = this.employeeForm.get('lastName').value;
    console.log("lastName",lastName);
    let phoneNumber = this.employeeForm.get('phoneNumber').value;
    console.log("phoneNumber",phoneNumber);
    let emailid = this.employeeForm.get('emailid').value;
    console.log("emailId",emailid);
    let dateOfJoining = this.employeeForm.get('dateOfJoining').value;
    console.log("dateOfJoining",dateOfJoining);
    let dateOfBirth = this.employeeForm.get('dateOfBirth').value;
    console.log("dateOfBirth",dateOfBirth);
    let address = this.employeeForm.get('address').value;
    console.log("address",address);
    let department = this.employeeForm.get('department').value;
    console.log("department",department);
    let salary = this.employeeForm.get('salary').value;
    console.log("salary",salary);
    let usertypeId = this.employeeForm.get('usertype').value.trim();
    let usertype =  parseInt(usertypeId);
    console.log("usertype",usertype);
    let employeetypeId = this.employeeForm.get('employeetype').value.trim();
    let employeetype =  parseInt(employeetypeId);
    console.log("employeetype",employeetype);
    let reportToId = this.employeeForm.get('reportTo').value.trim();
    let reportTo =  parseInt(reportToId);
    console.log("reportTo",reportTo);
    let designationId = this.employeeForm.get('designation').value.trim();
    let designation =  parseInt(designationId);
    console.log("designation",designation);
  
    if (this.articleIdToUpdate === null) {
      let attendance = new Employee(null, userid, password, firstName, lastName,phoneNumber,emailid,dateOfJoining,dateOfBirth,address,department,salary,reportTo,usertype,employeetype,designation);
      console.log("attendance0",attendance)
      this.employeeService.createEmployee(attendance)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllEmployee();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
      console.log("successCode");
    } else {
      //Handle update article
      let userType = new Employee(this.articleIdToUpdate, userid, password, firstName, lastName,phoneNumber,emailid,dateOfJoining,dateOfBirth,address,department,salary,reportTo,usertype,employeetype,designation);
      this.employeeService.updateEmployee(userType)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllEmployee();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deleteEmployee(id: string) {
    this.preProcessConfigurations();
    this.employeeService.deleteEmployeeById(id)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllEmployee();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);

  }
   
  reportTo(designation: number) {
    let designationId = this.employeeForm.get('designation').value.trim();
    designation =  parseInt(designationId);
    console.log("designation",designation)
    this.preProcessConfigurations();
    this.employeeService.employeeForReportTo(designation)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllEmployee();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);

  }
  loadEmployeeToEdit(id: string) {
    this.preProcessConfigurations();
    this.employeeService.getEmployeeById(id)
      .subscribe(data => {

        this.articleIdToUpdate = data.id;
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
          department: data.department, 
          salary: data.salary, 
          employeetype: data.employeetype, 
          usertype: data.usertype, 
          designation: data.designation, 
          reportTo: data.reportTo
         
         });

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
    this.employeeForm.reset();
    this.processValidation = false;
  }

}
