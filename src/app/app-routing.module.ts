import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsertypeComponent } from './components/usertype/usertype.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { HolidayComponent } from './components/holiday/holiday.component';
import { EmployeeTypeComponent } from './components/employee-type/employee-type.component';
import { DesignationComponent } from './components/designation/designation.component';
import { LeavetypeComponent } from './components/leavetype/leavetype.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { DailyTaskComponent } from './components/daily-task/daily-task.component';
import { LeaveComponent } from './components/leave/leave.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { MenuComponent } from './components/menu/menu.component';
import { APP_BASE_HREF } from '@angular/common';
import { LeavebalancereportComponent } from './components/leavebalancereport/leavebalancereport.component';
import { SelfattendanceComponent } from './components/selfattendance/selfattendance.component';
import { ApplyforleaveComponent } from './components/applyforleave/applyforleave.component';
import { MyLeaveapplicationComponent } from './components/my-leaveapplication/my-leaveapplication.component';
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: MenuComponent },
  { path: 'usertype', component: UsertypeComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'holiday', component: HolidayComponent },
  { path: 'employeeType', component: EmployeeTypeComponent },
  { path: 'designation', component: DesignationComponent },
  { path: 'leaveType', component: LeavetypeComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'dailyTask', component: DailyTaskComponent },
  { path: 'leave', component: LeaveComponent },
  { path: 'approvals', component: ApprovalsComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'leavereport', component: LeavebalancereportComponent },
  { path: 'selfattendance', component: SelfattendanceComponent },
  { path: 'applyleave', component: ApplyforleaveComponent },
  { path: 'myleave', component: MyLeaveapplicationComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
