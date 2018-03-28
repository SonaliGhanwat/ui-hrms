import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { UsertypeComponent } from './usertype.component';
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
import { AttendanceComponent } from '../../components/attendance/attendance.component';
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
import { UserType } from '../../models/UserType/UserType.model';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { Keepalive } from '@ng-idle/keepalive';
import {HeaderComponent} from '../../components/header/header.component'
import {FooterComponent} from '../../components/footer/footer.component'
describe(' UserType Component', () => {

  let component: UsertypeComponent;
  let fixture: ComponentFixture<UsertypeComponent>;
 
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

    fixture = TestBed.createComponent(UsertypeComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
   
  });  
  it('userTypeForm invalid when empty', () => {
    expect(component.usertypeForm.valid).toBeFalsy();
  });
  it('userid field validity', () => {
    let errors = {};
    const userid = component.usertypeForm.controls['usertypeName'];
    expect(userid.valid).toBeFalsy();
    errors = userid.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('description field validity', () => {
    let errors = {};
    const password = component.usertypeForm.controls['description'];
    expect(password.valid).toBeFalsy();
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('submitting a form emits a user', () => {
    expect(component.usertypeForm.valid).toBeFalsy();
    component.usertypeForm.controls['usertypeName'].setValue('aaa');
    component.usertypeForm.controls['description'].setValue('aaaaa');
    // loginEl.nativeElement.value = "sonali123";
    // passwordEl.nativeElement.value = "sonali";
    expect(component.usertypeForm.valid).toBeTruthy();
    let user: UserType;
    component.loggedIn.subscribe((value) => user = value);
    component.onUserTypeFormSubmit();
    expect(user.usertypeName).toBe('aaa');
    expect(user.description).toBe('aaaaa');
  });
  
});
