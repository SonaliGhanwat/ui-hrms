import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../../services/Attendance/attendance.service';
import { Attendance } from '../../models/Attendance/Attendance.model';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee } from '../../models/Employee/Employee.model';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  allAttendance: Attendance[];
  allEmployee:Employee[]
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;
  constructor(private attendanceService: AttendanceService, private formBuilder: FormBuilder,private employeeService: EmployeeService) { }
  attendanceForm = this.formBuilder.group({
    'employee': ['', ([Validators.required])],
    'intime': ['', ([Validators.required])],
    'outtime': ['', [Validators.required]],
    'date': ['', [Validators.required]],


  });

  ngOnInit(): void {
    this.getAllAttendanceList();
    this.getAllEmployeeList();
  }
  getAllAttendanceList() {
    this.attendanceService.getAllAttendance()
      .subscribe(
      data => this.allAttendance = data,
      errorCode => this.statusCode = errorCode);
  }
  getAllEmployeeList() {
    this.employeeService.getAllEmployeeList()
      .subscribe(
      data => this.allEmployee = data,
      errorCode => this.statusCode = errorCode);
  }
  onEmployeeAttendanceFormSubmit() {
    this.preProcessConfigurations();
    let employeeId = this.attendanceForm.get('employee').value.trim();
    let employee =  parseInt(employeeId);
    console.log("employee",employee);
    let intime = this.attendanceForm.get('intime').value;
    let outtime = this.attendanceForm.get('outtime').value;
    let date = this.attendanceForm.get('date').value;
    if (this.articleIdToUpdate === null) {
      let attendance = new Attendance(null, employee, intime, outtime, date);
      console.log("attendance0",attendance)
      this.attendanceService.createEmployeeAttendance(attendance)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllAttendanceList();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
      console.log("successCode");
    } else {
      //Handle update article
      let userType = new Attendance(this.articleIdToUpdate, employee, intime, outtime, date);
      this.attendanceService.updateEmployeeAttendance(userType)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllAttendanceList();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deleteEmployeeAttendance(id: string) {
    this.preProcessConfigurations();
    this.attendanceService.deleteEmployeeAttendanceById(id)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllAttendanceList();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);

  }
  loadEmployeeAttendanceToEdit(id: string) {
    this.preProcessConfigurations();
    this.attendanceService.getEmployeeAttendanceById(id)
      .subscribe(data => {

        this.articleIdToUpdate = data.id;
        this.attendanceForm.setValue({ employee: data.employee, intime: data.intime, outtime: data.outtime, date: data.date });

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
    this.attendanceForm.reset();
    this.processValidation = false;
  }
  
}


