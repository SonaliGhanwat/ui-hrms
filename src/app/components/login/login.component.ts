import { Component, OnInit, EventEmitter, Input, Output, } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { LoginService } from '../../services/Login/login.service';
import { LoginModel } from '../../models/login/login.model';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CommonService } from '../../services/common/common.service';
import { ControlMessagesComponent } from '../control-messages/control-messages.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  data: any;
  userForm: FormGroup;
  statusCode: number;
  requestProcessing = false;
  toastMessage: string;

  @Output() loggedIn = new EventEmitter<LoginModel>();
  
  constructor(private spinner: Ng4LoadingSpinnerService, 
    private commonService: CommonService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private loginService: LoginService) {

  }
  
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      userid: ['', Validators.compose([ValidationService.userIdValidator, Validators.minLength(4)])],
      password: ['', [ValidationService.passwordValidator, Validators.minLength(4)]],
    });
  }
  
  validate() {
    Object.keys(this.userForm.controls).forEach(field => {
      const control = this.userForm.get(field);
      control.markAsTouched({ onlySelf: true });

    });
  }

  onLoginFormSubmit() {

    this.preProcessConfigurations();
    if (this.userForm.invalid) {
      return;
    }
    
    const userId = this.userForm.get('userid').value.trim();
    const password = this.userForm.get('password').value.trim();
    this.spinner.show();
    const loginModel = new LoginModel(userId, password);
    
    localStorage.setItem('userid', userId);
    
    // this.loggedIn.emit(loginModel);
    
    this.loginService.post(loginModel).subscribe(data => {
      this.spinner.hide();
      if (data.code === 1) {
        this.toastMessage = data.message;
        this.userForm.get('userid').setErrors({'invalidUserid': true});
        this.toastMessageDisplay();
      } else if (data.code === 2) {
        this.toastMessage = data.message;
        this.userForm.get('password').setErrors({'invalidPassword': true});
        this.toastMessageDisplay();
      } else if (data.code === 0) {
        this.redirectToHomePage();
      }
      const cookie = data.data.value;
      Cookie.set('cookieName', cookie);
      const myCookie = Cookie.get('cookieName');
    });
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  redirectToHomePage() {
    this.router.navigate(['/home']);
    return true;
  }

  toastMessageDisplay() {
    this.commonService.displayMessage();
  }

}
