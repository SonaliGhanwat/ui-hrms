import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DailytaskService } from '../../services/DailyTask/dailytask.service';
import { DailyTask } from '../../models/DailyTask/DailyTask.model';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee } from '../../models/Employee/Employee.model';
import { ValidationService } from '../../services/validation.service';
import { CommonService } from '../../services/common/common.service';
@Component({
  selector: 'app-daily-task',
  templateUrl: './daily-task.component.html',
  styleUrls: ['./daily-task.component.css']
})
export class DailyTaskComponent implements OnInit {

  allDailyTask: DailyTask[];
  allEmployee: Employee[];
  dailyTaskIdToUpdate = null;
  processValidation = false;
  collection = [];
  toastMessage: string;
  estimationTime: any;
  constructor(private commonService: CommonService, private dailytaskService: DailytaskService, private formBuilder: FormBuilder, private employeeService: EmployeeService) { }
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
    this.commonService.onPreviousNextPage();
  }
  getAllDailyTask() {
    this.commonService.startLoadingSpinner();
    this.dailytaskService.getAllDailyTaskList()
      .subscribe(
      data => this.allDailyTask = data, );
    this.commonService.hideSpinner();
  }
  getAllEmployeeList() {
    this.employeeService.getAllEmployeeList()
      .subscribe(
      data => this.allEmployee = data, );
  }
  onDailyTaskFormSubmit() {
    this.commonService.startLoadingSpinner();
    const employeeId = ((document.getElementById('employee') as HTMLInputElement).value);
    const employee = parseInt(employeeId);
    const date = this.dailyTaskForm.get('date').value;
    const taskName = this.dailyTaskForm.get('taskName').value;
    let estimationTime = this.dailyTaskForm.get('estimationTime').value;
    if (estimationTime.split(':').length === 2) {
      estimationTime = this.dailyTaskForm.get('estimationTime').value + ':00';
    } else {
      estimationTime = this.dailyTaskForm.get('estimationTime').value;
    }
    let starttime = this.dailyTaskForm.get('starttime').value;
    if (starttime.split(':').length === 2) {
      starttime = this.dailyTaskForm.get('starttime').value + ':00';
    } else {
      starttime = this.dailyTaskForm.get('starttime').value;
    }
    let endtime = this.dailyTaskForm.get('endtime').value;
    if (endtime.split(':').length === 2) {
      endtime = this.dailyTaskForm.get('endtime').value + ':00';
    } else {
      endtime = this.dailyTaskForm.get('endtime').value;
    }
    const status = this.dailyTaskForm.get('status').value;
    const description = this.dailyTaskForm.get('description').value;
    if (this.dailyTaskIdToUpdate === null) {
      const attendance = new DailyTask(null, employee, date, taskName, estimationTime, starttime, endtime, status, description);
      this.dailytaskService.createDailyTask(attendance)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.commonService.hideSpinner();
          this.toastMessage = successCode.message;
          this.getAllDailyTask();
          this.dailyTaskForm.reset();
        }, );
    } else {
      const userType = new DailyTask(this.dailyTaskIdToUpdate, employee, date, taskName, estimationTime, starttime, endtime, status, description);
      this.dailytaskService.updateDailyTask(userType)
        .subscribe(successCode => {
          // let message = successCode.message;
          this.toastMessage = successCode.message;
          this.getAllDailyTask();
          this.dailyTaskForm.reset();
        }, );
    }
  }
  deleteDailyTask(id: string) {

    this.commonService.startLoadingSpinner();
    this.dailytaskService.deleteDailyTaskById(id)
      .subscribe(successCode => {
        // let message = successCode.message;
        this.toastMessage = successCode.message;
        this.getAllDailyTask();
        this.commonService.hideSpinner();
      }, );

  }
  loadDailyTaskToEdit(id: string) {
    this.dailytaskService.getDailyTaskById(id)
      .subscribe(dailyTask => {
        this.dailyTaskIdToUpdate = dailyTask.id;
        this.dailyTaskForm.setValue({ employee: dailyTask.employee.id, date: dailyTask.date, taskName: dailyTask.taskName, estimationTime: dailyTask.estimationTime, starttime: dailyTask.starttime, endtime: dailyTask.endtime, status: dailyTask.status, description: dailyTask.description });

      }, );
  }
  timeValidation() {
    const starttime = this.dailyTaskForm.get('starttime').value;
    const endtime = this.dailyTaskForm.get('endtime').value;
    if (starttime <= endtime) {
    } else if (endtime <= starttime) {
      document.getElementById('outtime_validation').innerHTML = 'End Time should be greater then Start Time';
      return false;
    }
    document.getElementById('outtime_validation').innerHTML = '';
    return true;
  }
  calculateEstimationTime() {
    const starttime = this.dailyTaskForm.get('starttime').value;
    const endtime = this.dailyTaskForm.get('endtime').value;
    const starttime1 = starttime.substring(0, 2);
    const endtime1 = endtime.substring(0, 2);
    const date1 = new Date();
    date1.setHours(starttime1);
    const date2 = new Date();
    date2.setHours(endtime1);
    const totalTime = date2.getTime() - date1.getTime();
    this.estimationTime = totalTime / (60 * 60 * 1000) % 24;
    const leave = document.getElementById('estimationTime').innerHTML = this.estimationTime + ' hours';
    sessionStorage.setItem('totalleaves', leave);
  }


  displayToastMessage() {
    this.commonService.displayMessage();
  }
  clearForm(){
    this.dailyTaskForm.reset();
  }
}
