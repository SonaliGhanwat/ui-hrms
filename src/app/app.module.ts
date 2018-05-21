import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { DataTableModule } from 'angular2-datatable';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { Ng2PaginationModule } from 'ng2-pagination';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { ValidationService } from './services/validation.service';
import { UsertypeComponent } from './components/usertype/usertype.component';
import { LoginService } from './services/Login/login.service';
import { UsertypeService } from './services/UserType/usertype.service';
import { HolidayComponent } from './components/holiday/holiday.component';
import { HolidayService } from './services/Holiday/holiday.service';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { AttendanceService } from './services/Attendance/attendance.service';
import { EmployeeTypeComponent } from './components/employee-type/employee-type.component';
import { EmployeetypeService } from './services/EmployeeType/employeetype.service';
import { DesignationComponent } from './components/designation/designation.component';
import { DesignationService } from './services/Designation/designation.service';
import { LeavetypeComponent } from './components/leavetype/leavetype.component';
import { LeavetypeService } from './services/LeaveType/leavetype.service';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeService } from './services/Employee/employee.service';
import { DailyTaskComponent } from './components/daily-task/daily-task.component';
import { DailytaskService } from './services/DailyTask/dailytask.service';
import { LeaveComponent } from './components/leave/leave.component';
import { LeaveService } from './services/Leave/leave.service';
import { CommonService } from './services/common/common.service';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { ApprovalsService } from './services/Approvals/approvals.service';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { LeavebalancereportComponent } from './components/leavebalancereport/leavebalancereport.component';
import { SelfattendanceComponent } from './components/selfattendance/selfattendance.component';
import { ApplyforleaveComponent } from './components/applyforleave/applyforleave.component';
import { MyLeaveApplicationComponent  } from './components/my-leaveapplication/my-leaveapplication.component';
import { PageComponent } from './components/page/page.component';
import { PageService } from './services/Page/page.service';
import { UsertypePageAssociationComponent  } from './components/usertype-pageassociation/usertype-pageassociation.component';
import { UsertypePageassociationService } from './services/Usertype-PageAssociation/usertype-pageassociation.service';
import { AppDataService } from './services/app-data/app-data.service';
import { RegularizationComponent } from './components/regularization/regularization.component';
import { RegularizationService } from './services/Regularization/regularization.service';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentService } from './services/Department/department.service';
import { DatePipe } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectService } from './services/Project/project.service';
import { MyTaskComponent } from './components/my-task/my-task.component';
import { AssigntaskComponent } from './components/assigntask/assigntask.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
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
    ApprovalsComponent,
    ResetpasswordComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LeavebalancereportComponent,
    SelfattendanceComponent,
    ApplyforleaveComponent,
    MyLeaveApplicationComponent ,
    PageComponent,
    UsertypePageAssociationComponent,
    RegularizationComponent,
    DepartmentComponent,
    ProfileComponent,
    ProjectComponent,
    MyTaskComponent,
    AssigntaskComponent 

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    Ng2OrderModule,
    BrowserAnimationsModule,
    DataTableModule,
    Ng2PaginationModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
    Ng4LoadingSpinnerModule.forRoot(),
    RouterModule,
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
    CommonService,
    HttpClientModule,
    ApprovalsService,
    PageService,
    UsertypePageassociationService,
    AppDataService,
    RegularizationService,
    DepartmentService,
    DatePipe,
    ProjectService
  ],

  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})

export class AppModule { }
