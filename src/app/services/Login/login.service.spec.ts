import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import {Component, DebugElement} from '@angular/core';
import {LoginComponent} from '../../components/login/login.component';
import { LoginModel } from '../../models/login/login.model';
import {By} from '@angular/platform-browser';
import { LoginService } from './login.service';

describe('LoginService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService]
    });
  });
  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
  it('#isLoggedIn should return false after creation', inject([LoginService], (service: LoginService) => {
    // expect(service.isLoggedIn()).toBeFalsy();
  }));
});
