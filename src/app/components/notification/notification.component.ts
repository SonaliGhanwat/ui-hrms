import { Component, OnInit } from '@angular/core';
import { Attendance } from '../../models/Attendance/Attendance.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/Notification/notification.service';
import { CommonService } from '../../services/common/common.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  allAttendance: Attendance[];
  allAbsentAttendance: Attendance[];
  collection = [];
  constructor(private notificationService: NotificationService, private formBuilder: FormBuilder,
     private commonService: CommonService) { }

  ngOnInit() {
    this.getAllAttendanceList();
    this.getAllAttendanceListbyStatus();
    this.commonService.onPreviousNextPage();
  }
  getAllAttendanceList() {
    this.notificationService.getAllAttendanceByUserId()
      .subscribe(
      data => {
        this.allAttendance = data.data;
        const code = data.code;
        if (code === 0) {
          document.getElementById('data').innerHTML = 'There is no any request for Leave Approval';
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
          document.getElementById('data').innerHTML = 'There is no any request for Leave Approval';
        }
      },);
  }
}
