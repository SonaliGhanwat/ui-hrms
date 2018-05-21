import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DailytaskService } from '../../services/DailyTask/dailytask.service';
import { DailyTask } from '../../models/DailyTask/DailyTask.model';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee } from '../../models/Employee/Employee.model';
import { ValidationService } from '../../services/validation.service';
import { CommonService } from '../../services/common/common.service';
@Component({
  selector: 'app-assigntask',
  templateUrl: './assigntask.component.html',
  styleUrls: ['./assigntask.component.css']
})
export class AssigntaskComponent implements OnInit {
  tasklist: DailyTask[];
  constructor(private commonService: CommonService, private dailytaskService: DailytaskService, private formBuilder: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getAllDailyTaskByReportTo();
  }
  getAllDailyTaskByReportTo() {
    this.commonService.startLoadingSpinner();
    this.dailytaskService.getAllDailyTaskListBYReportTo()
      .subscribe(
      data => this.tasklist = data.data, );
    this.commonService.hideSpinner();
  }
}
