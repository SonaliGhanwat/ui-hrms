import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule,Http} from '@angular/http';
import {TranslateModule,TranslateLoader,TranslateStaticLoader} from 'ng2-translate';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { ValidationService } from './services/validation.service';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { UsertypeComponent } from './components/usertype/usertype.component';
import { LoginService } from './components/login/login.service';
import { UsertypeService } from './components/usertype/usertype.service'



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ControlMessagesComponent,
    AttendanceComponent,
    UsertypeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule ,
    AppRoutingModule,
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
      deps: [Http]
  })
  ],
  providers: [ValidationService,LoginService,UsertypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
