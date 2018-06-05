import { Component, OnInit } from '@angular/core';
import { Attendance } from '../../models/Attendance/Attendance.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/Notification/notification.service';
import { CommonService } from '../../services/common/common.service';
import { DailyTask } from '../../models/DailyTask/DailyTask.model';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  allAttendance: Attendance[];
  allAbsentAttendance: Attendance[];
  dailyTask: DailyTask[];
  collection = [];
  constructor(private notificationService: NotificationService, private formBuilder: FormBuilder,
     private commonService: CommonService) { }

  ngOnInit() {
    this.getAllAttendanceList();
    this.getAllAttendanceListbyStatus();
    this.getAllTaskListUserId();
    this.commonService.onPreviousNextPage();
  }
  getAllAttendanceList() {
    this.notificationService.getAllAttendanceByUserId()
      .subscribe(
      data => {
        this.allAttendance = data.data;
        const code = data.code;
        if (code === 0) {
          document.getElementById('data').innerHTML = 'There is no any request for Notification';
        }
      },);
  }

  getAllAttendanceListbyStatus() {
    this.notificationService.getAllAttendanceByStatus()
      .subscribe(
      data => {
        this.allAbsentAttendance = data.data;
        const code = data.code;
        if (code === 0) {
          document.getElementById('data').innerHTML = 'There is no any request for Notification';
        }
      },);
  }
  getAllTaskListUserId() {
    this.notificationService.getAlltaskByUserId()
      .subscribe(
      data => {
        this.dailyTask = data.data;
        const code = data.code;
        if (code === 0) {
          document.getElementById('data').innerHTML = 'There is no any request for Notification';
        }
      },);
  }
}
