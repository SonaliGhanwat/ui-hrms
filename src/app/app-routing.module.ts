import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsertypeComponent } from './components/usertype/usertype.component'
import { AttendanceComponent } from './components/attendance/attendance.component';
import { HolidayComponent } from './components/holiday/holiday.component'
import { EmployeeTypeComponent } from './components/employee-type/employee-type.component'
import { DesignationComponent} from './components/designation/designation.component'
import { LeavetypeComponent } from'./components/leavetype/leavetype.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'usertype', component: UsertypeComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'holiday', component: HolidayComponent },
  { path: 'employeeType', component: EmployeeTypeComponent },
  { path: 'designation', component: DesignationComponent },
  { path: 'leaveType', component: LeavetypeComponent },
];
@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }