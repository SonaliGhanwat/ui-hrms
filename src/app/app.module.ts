import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { Ng2OrderModule } from 'ng2-order-pipe';
import {DataTableModule} from "angular2-datatable";
import {Ng2PaginationModule} from 'ng2-pagination';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { ValidationService } from './services/validation.service';
import { UsertypeComponent } from './components/usertype/usertype.component';
import { LoginService } from './components/login/login.service';
import { UsertypeService } from './services/UserType/usertype.service';
import { HolidayComponent } from './components/holiday/holiday.component';
import { HolidayService } from './services/Holiday/holiday.service'
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendanceService } from './services/Attendance/attendance.service';
import { EmployeeTypeComponent } from './components/employee-type/employee-type.component'
import { EmployeetypeService } from './services/EmployeeType/employeetype.service';
import { DesignationComponent } from './components/designation/designation.component'
import { DesignationService } from './services/Designation/designation.service';
import { LeavetypeComponent } from './components/leavetype/leavetype.component';
import { LeavetypeService } from './services/LeaveType/leavetype.service';
import { EmployeeComponent } from './components/employee/employee.component'
import { EmployeeService} from './services/Employee/employee.service';
import { DailyTaskComponent } from './components/daily-task/daily-task.component';
import {DailytaskService}from './services/DailyTask/dailytask.service';
import { LeaveComponent } from './components/leave/leave.component'
import{LeaveService} from './services/Leave/leave.service'
import{CommonService} from './services/common service/common.service'




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ControlMessagesComponent,
    AttendanceComponent,
    UsertypeComponent,
    HolidayComponent,
    EmployeeTypeComponent,
    DesignationComponent,
    LeavetypeComponent,
    EmployeeComponent,
    DailyTaskComponent,
    LeaveComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    HttpModule,
    Ng2OrderModule,
    BrowserAnimationsModule,
    DataTableModule,
    Ng2PaginationModule,
    
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
    })
  ],
  providers: [
    ValidationService,
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
    CommonService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
