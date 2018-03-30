import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AttendanceComponent } from './attendance.component';
import { Component, DebugElement } from '@angular/core';
import { UsertypeComponent } from '../../components/usertype/usertype.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common/common.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { By } from '@angular/platform-browser';
import { ControlMessagesComponent } from '../../components/control-messages/control-messages.component';
import { ValidationService } from '../../services/validation.service';
import { LoginComponent } from '../../components/login/login.component';
import {MenuComponent} from '../../components/menu/menu.component'
import { LoginService } from '../../services/Login/login.service';
import { UsertypeService } from '../..//services/UserType/usertype.service';
import { HolidayComponent } from '../../components/holiday/holiday.component';
import { HolidayService } from '../../services/Holiday/holiday.service';
import { AttendanceService } from '../../services/Attendance/attendance.service';
import { EmployeeTypeComponent } from '../../components/employee-type/employee-type.component';
import { EmployeetypeService } from '../../services/EmployeeType/employeetype.service';
import { DesignationComponent } from '../../components/designation/designation.component';
import { DesignationService } from '../../services/Designation/designation.service';
import { LeavetypeComponent } from '../../components/leavetype/leavetype.component';
import { LeavetypeService } from '../../services/LeaveType/leavetype.service';
import { EmployeeComponent } from '../../components/employee/employee.component';
import { EmployeeService } from '../../services/Employee/employee.service';
import { DailyTaskComponent } from '../../components/daily-task/daily-task.component';
import { DailytaskService } from '../../services/DailyTask/dailytask.service';
import { LeaveComponent } from '../../components/leave/leave.component';
import { LeaveService } from '../../services/Leave/leave.service';
import { ApprovalsComponent } from '../../components/approvals/approvals.component';
import { ApprovalsService } from '../../services/Approvals/approvals.service';
import { ResetpasswordComponent } from '../../components/resetpassword/resetpassword.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { DataTableModule } from 'angular2-datatable';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { APP_BASE_HREF } from '@angular/common';
import { Attendance } from '../../models/Attendance/Attendance.model';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { Keepalive } from '@ng-idle/keepalive';
import {HeaderComponent} from '../../components/header/header.component'
import {FooterComponent} from '../../components/footer/footer.component'
describe('AttendanceComponent', () => {
  let component: AttendanceComponent;
  let fixture: ComponentFixture<AttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, TranslateModule.forRoot(), HttpModule, HttpClientModule, Ng4LoadingSpinnerModule.forRoot(),
        AppRoutingModule,NgIdleKeepaliveModule, Ng2PaginationModule, Ng2OrderModule, DataTableModule, Ng2SearchPipeModule],
      declarations: [LoginComponent, MenuComponent, ControlMessagesComponent,
        AttendanceComponent,
        UsertypeComponent,
        HolidayComponent,
        EmployeeTypeComponent,
        DesignationComponent,
        LeavetypeComponent,
        EmployeeComponent,
        DailyTaskComponent,
        LeaveComponent,
        ApprovalsComponent,
        ResetpasswordComponent,
        HeaderComponent,
        FooterComponent],
      providers: [ValidationService,
        LoginService,
        UsertypeService,
        HolidayService,
        AttendanceService,
        EmployeetypeService,
        DesignationService,
        LeavetypeService,
        EmployeeService,
        DailytaskService,
        LeaveService,
        CommonService,
        HttpClientModule,
        ApprovalsService,
        Keepalive,
        { provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>' }
      ],
    });

    fixture = TestBed.createComponent(AttendanceComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
   
  });  
  it('userTypeForm invalid when empty', () => {
    expect(component.attendanceForm.valid).toBeFalsy();
  });
  it('employee field validity', () => {
    let errors = {};
    const employee = component.attendanceForm.controls['employee'];
    expect(employee.valid).toBeFalsy();
    errors = employee.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('intime field validity', () => {
    let errors = {};
    const intime = component.attendanceForm.controls['intime'];
    expect(intime.valid).toBeFalsy();
    errors = intime.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('outtime field validity', () => {
    let errors = {};
    const outtime = component.attendanceForm.controls['outtime'];
    expect(outtime.valid).toBeFalsy();
    errors = outtime.errors || {};
    expect(errors['required']).toBeTruthy();
  });
});
