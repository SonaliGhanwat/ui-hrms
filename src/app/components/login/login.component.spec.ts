import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common/common.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { HomeComponent } from '../../components/home/home.component';
import { By } from '@angular/platform-browser';
import { ControlMessagesComponent } from '../../components/control-messages/control-messages.component';
import { ValidationService } from '../../services/validation.service';
import { UsertypeComponent } from '../../components/usertype/usertype.component';
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
import { LoginModel } from '../../models/login/login.model';
describe(' Login Component', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitEl: DebugElement;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, TranslateModule.forRoot(), HttpModule, HttpClientModule, Ng4LoadingSpinnerModule.forRoot(),
        AppRoutingModule, Ng2PaginationModule, Ng2OrderModule, DataTableModule, Ng2SearchPipeModule],
      declarations: [LoginComponent, HomeComponent, ControlMessagesComponent,
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
        ResetpasswordComponent,],
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
        { provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>' }
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    submitEl = fixture.debugElement.query(By.css('button'));
    loginEl = fixture.debugElement.query(By.css('input[type=text]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
  });  
  it('userForm invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });
  it('userid field validity', () => {
    let errors = {};
    const userid = component.userForm.controls['userid'];
    expect(userid.valid).toBeFalsy();
    errors = userid.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('password field validity', () => {
    let errors = {};
    const password = component.userForm.controls['password'];
    expect(password.valid).toBeFalsy();
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  it('submitting a form emits a user', () => {
    expect(component.userForm.valid).toBeFalsy();
    component.userForm.controls['userid'].setValue('sonali12');
    component.userForm.controls['password'].setValue('sonali');
    // loginEl.nativeElement.value = "sonali123";
    // passwordEl.nativeElement.value = "sonali";
    expect(component.userForm.valid).toBeTruthy();
    let user: LoginModel;
    component.loggedIn.subscribe((value) => user = value);
    component.onLoginFormSubmit();
    expect(user.userid).toBe('sonali12');
    expect(user.password).toBe('sonali');
  });
 it('Setting enabled to false disabled the submit button', () => {
    component.enabled = false;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });

   it('Setting enabled to true enables the submit button', () => {
    component.enabled = true;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeFalsy();
  });
});
