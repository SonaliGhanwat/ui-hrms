import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonService } from '../../services/common service/common.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { HomeComponent } from '../../components/home/home.component';
import { By } from '@angular/platform-browser';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, TranslateModule.forRoot(), HttpModule, HttpClientModule, Ng4LoadingSpinnerModule.forRoot(), AppRoutingModule],
      declarations: [LoginComponent],
      providers: [HttpClientModule, CommonService],
    })
      .compileComponents();

  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('userForm invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });
  it('userid field validity', () => {
    let errors = {};
    const userid = component.userForm.controls['userid'];
    expect(userid.valid).toBeFalsy();

    // Email field is required
    errors = userid.errors || {};
    expect(errors['required']).toBeTruthy();
  });
});
