import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
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
import { LeavetypeService } from './services/LeaveType/leavetype.service'



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
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule,
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
    LeavetypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
