import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from '../../services/Attendance/attendance.service';
import { Attendance } from '../../models/Attendance/Attendance.model';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  allAttendance: Attendance[];
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;
  constructor(private attendanceService: AttendanceService, private formBuilder: FormBuilder) { }
  attendanceForm = this.formBuilder.group({
    'usertypeName': ['', ([Validators.required])],
    'description': ['', [Validators.required]],


  });

  ngOnInit(): void {
    this.getAllAttendanceList();
  }
  getAllAttendanceList() {
    this.attendanceService.getAllAttendance()
      .subscribe(
      data => this.allAttendance = data,
      errorCode => this.statusCode = errorCode);
  }
 

}
