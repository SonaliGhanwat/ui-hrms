import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
import { LoginService } from './login.service';
import { LoginModel } from '../../models/login/login.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data:any;
  userForm: any;
  statusCode: number;
  requestProcessing = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private loginService: LoginService) {

    this.userForm = this.formBuilder.group({
      'userid': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      'password': ['', [Validators.required, ValidationService.passwordValidator]],


    });
  }
  onLoginFormSubmit() {

    if (this.userForm.invalid) {
      return;
    }
    this.preProcessConfigurations();
    let userid = this.userForm.get('userid').value.trim();
    let password = this.userForm.get('password').value.trim();
    let loginModel = new LoginModel(userid, password);
    this.loginService.post(loginModel).subscribe(data => {
      console.log("data", data);
      this.redirectToHomePage();
    });
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  ngOnInit() {
  }

  redirectToHomePage() {
    this.router.navigate(['/home']);
  }
}
