import { Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: any;
  
  constructor(private formBuilder: FormBuilder,private router:Router) {
      
    this.userForm = this.formBuilder.group({
      'userid': ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      'password': ['', [Validators.required, ValidationService.passwordValidator]],
      
     
    });
  }
  
  redirectToHomePage= function () {
    this.router.navigate(['/home']);
};


  ngOnInit() {
  }

}
