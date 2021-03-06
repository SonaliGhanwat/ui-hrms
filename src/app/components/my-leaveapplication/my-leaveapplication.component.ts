import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from '../../services/Leave/leave.service';
import { Leave } from '../../models/Leave/Leave.model';
import { EmployeeService } from '../../services/Employee/employee.service';
import { Employee } from '../../models/Employee/Employee.model';
import { LeavetypeService } from '../../services/LeaveType/leavetype.service';
import { LeaveType } from '../../models/LeaveType/Leavetype.model';
import { ValidationService } from '../../services/validation.service';
import { CommonService } from '../../services/common/common.service';
import { AppDataService } from '../../services/app-data/app-data.service';

@Component({
    selector: 'app-my-leaveapplication',
    templateUrl: './my-leaveapplication.component.html',
    styleUrls: ['./my-leaveapplication.component.css']
})
export class MyLeaveApplicationComponent implements OnInit {

    allLeave: Leave[];
    statusCode: number;
    requestProcessing = false;
    leaveIdToUpdate = null;
    processValidation = false;


    constructor(private commonService: CommonService, 
    private leaveService: LeaveService, 
    private leavetypeService: LeavetypeService,
    private appData: AppDataService) { }

    ngOnInit() {
        this.getLeaveByUserId();

    }

    getLeaveByUserId() {
        this.commonService.startLoadingSpinner();
        this.leaveService.getLeaveByUserId(this.appData.getUserId())
            .subscribe(
            data => {
                this.allLeave = data.data;
                const code = data.code;
                console.log('code:',code);
                if (code === 1) {
                    document.getElementById('data').innerHTML = 'There is no any Leave apply';
                  } else {
                    document.getElementById('data').innerHTML = '';
                  }
            },
            errorCode => this.statusCode = errorCode);
        this.commonService.hideSpinner();
    }
    preProcessConfigurations() {
        this.statusCode = null;
        this.requestProcessing = true;
    }

}
