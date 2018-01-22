import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DailytaskService } from '../../services/DailyTask/dailytask.service';
import { DailyTask } from '../../models/DailyTask/DailyTask.model';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee } from '../../models/Employee/Employee.model';
import { ValidationService } from '../../services/validation.service';
@Component({
  selector: 'app-daily-task',
  templateUrl: './daily-task.component.html',
  styleUrls: ['./daily-task.component.css']
})
export class DailyTaskComponent implements OnInit {

  allDailyTask: DailyTask[];
  allEmployee: Employee[]
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;
  collection=[];
  constructor(private dailytaskService: DailytaskService, private formBuilder: FormBuilder, private employeeService: EmployeeService) { }
  dailyTaskForm = this.formBuilder.group({
    'employee': ['', ([Validators.required])],
    'date': ['', ([Validators.required, ValidationService.currentDateValidation])],
    'taskName': ['', [Validators.required]],
    'estimationTime': ['', [Validators.required]],
    'starttime': ['', [Validators.required]],
    'endtime': ['', [Validators.required]],
    'status': ['', [Validators.required]],
    'description': ['', [Validators.required]],


  });

  ngOnInit(): void {
    this.getAllDailyTask();
    this.getAllEmployeeList();
    this.onPreviousNextPage();
  }
  getAllDailyTask() {
    this.dailytaskService.getAllDailyTaskList()
      .subscribe(
      data => this.allDailyTask = data,
      errorCode => this.statusCode = errorCode);
  }
  getAllEmployeeList() {
    this.employeeService.getAllEmployeeList()
      .subscribe(
      data => this.allEmployee = data,
      errorCode => this.statusCode = errorCode);
  }
  onDailyTaskFormSubmit() {
    this.preProcessConfigurations();
    let employeeId = this.dailyTaskForm.get('employee').value.trim();
    let employee = parseInt(employeeId);
    let date = this.dailyTaskForm.get('date').value;
    let taskName = this.dailyTaskForm.get('taskName').value;
    let estimationTime = this.dailyTaskForm.get('estimationTime').value;
    if(estimationTime.split(":").length===2){
      estimationTime = this.dailyTaskForm.get('estimationTime').value + ':00';
    }else{
      estimationTime = this.dailyTaskForm.get('estimationTime').value ;
    }
    let starttime = this.dailyTaskForm.get('starttime').value;
    if(starttime.split(":").length===2){
      starttime = this.dailyTaskForm.get('starttime').value + ':00';
    }else{
      starttime = this.dailyTaskForm.get('starttime').value ;
    }
    let endtime = this.dailyTaskForm.get('endtime').value;
    if(endtime.split(":").length===2){
      endtime = this.dailyTaskForm.get('endtime').value + ':00';
    }else{
      endtime = this.dailyTaskForm.get('endtime').value ;
    }
    let status = this.dailyTaskForm.get('status').value;
    let description = this.dailyTaskForm.get('description').value;

    if (this.articleIdToUpdate === null) {
      let attendance = new DailyTask(null, employee, date, taskName, estimationTime, starttime, endtime, status, description);
      console.log("attendance0", attendance)
      this.dailytaskService.createDailyTask(attendance)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllDailyTask();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
      console.log("successCode");
    } else {
      //Handle update article
      let userType = new DailyTask(this.articleIdToUpdate, employee, date, taskName, estimationTime, starttime, endtime, status, description);
      this.dailytaskService.updateDailyTask(userType)
        .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllDailyTask();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deleteDailyTask(id: string) {
    this.preProcessConfigurations();
    this.dailytaskService.deleteDailyTaskById(id)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllDailyTask();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);

  }
  loadDailyTaskToEdit(id: string) {
    this.preProcessConfigurations();
    this.dailytaskService.getDailyTaskById(id)
      .subscribe(dailyTask => {

        this.articleIdToUpdate = dailyTask.id;
        this.dailyTaskForm.setValue({ employee:dailyTask.employee, date: dailyTask.date, taskName: dailyTask.taskName, estimationTime: dailyTask.estimationTime, starttime: dailyTask.starttime, endtime: dailyTask.endtime, status: dailyTask.status, description: dailyTask.description });

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
    this.dailyTaskForm.reset();
    this.processValidation = false;
  }

  onPreviousNextPage(){
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`dailyTask ${i}`);
    }
  }
}
