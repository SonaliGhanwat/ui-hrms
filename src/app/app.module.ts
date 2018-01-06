import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ControlMessagesComponent } from './component/control-messages/control-messages.component';
import { ValidationService } from './services/validation.service';
import { AttendanceComponent } from './attendance/attendance.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ControlMessagesComponent,
    AttendanceComponent,
   
  ],
  imports: [
    BrowserModule,
    
    ReactiveFormsModule ,
    AppRoutingModule
  ],
  providers: [ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
