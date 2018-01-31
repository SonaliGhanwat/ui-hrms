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
  toastMessage :string
  
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
      let message = data.message;
       this.toastMessage = message;
       let code = data.code;
       if(code===1){
        this.toastMessage = message;
       }else if(code===0){
        this.toastMessage = message;
        this.redirectToHomePage();  
       }
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
    return true;
  }
   toastMessageDisplay() {
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 9000);
}
}
