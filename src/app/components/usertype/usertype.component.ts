
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsertypeService } from '../../services/UserType/usertype.service';
import { UserType } from '../../models/UserType/UserType.model';
import {Http} from "@angular/http";



@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.component.html',
  styleUrls: ['./usertype.component.css']
})
export class UsertypeComponent implements OnInit {

  allUsertypes: UserType[]
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;
  collection = [];
   isDesc: boolean = false;
   UserType: string = 'usertypeName';
  
  constructor(private http:Http,private usertypeService: UsertypeService, private formBuilder: FormBuilder) {
   
   }
  usertypeForm = this.formBuilder.group({
    'usertypeName': ['', ([Validators.required])],
    'description': ['', [Validators.required]],


  });

  ngOnInit(): void {
    this.getAllUserTypes();
    this.onPreviousNextPage();
  }
  getAllUserTypes() {
    this.usertypeService.getAllUserTypes()
      .subscribe(
      data => this.allUsertypes = data,
      errorCode => this.statusCode = errorCode);
  }
  onUserTypeFormSubmit() {
    this.preProcessConfigurations();
    let usertypeName = this.usertypeForm.get('usertypeName').value.trim();
    let description = this.usertypeForm.get('description').value.trim();
    if (this.articleIdToUpdate === null) {

      let userType = new UserType(null, usertypeName, description);
      this.usertypeService.createUserType(userType)
        .subscribe(successCode => {
          console.log("successCode",successCode);
          this.statusCode = successCode;
          this.getAllUserTypes();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
      console.log("successCode");
    } else {
      //Handle update article
      let userType = new UserType(this.articleIdToUpdate, usertypeName, description);
      this.usertypeService.updateUserType(userType)
        .subscribe(successCode => {
          this.statusCode = successCode;
         
          this.getAllUserTypes();
          this.backToCreateArticle();
        },
        errorCode => this.statusCode = errorCode);
    }
  }
  deleteUserType(id: string) {
    this.preProcessConfigurations();
    this.usertypeService.deleteUserTypeById(id)
      .subscribe(successCode => {
        this.statusCode = successCode;
        this.getAllUserTypes();
        this.backToCreateArticle();
      },
      errorCode => this.statusCode = errorCode);

  }
  loadUserTypeToEdit(id: string) {
    this.preProcessConfigurations();
    this.usertypeService.getUserTypeById(id)
      .subscribe(userType => {

        this.articleIdToUpdate = userType.id;
        this.usertypeForm.setValue({ usertypeName: userType.usertypeName, description: userType.description });
        console.log("usertypeName", userType.usertypeName);
        this.processValidation = true;
        this.requestProcessing = false;
      },
      errorCode => this.statusCode = errorCode);
  }

  preProcessConfigurations() {

    this.statusCode = null;
    this.requestProcessing = true;
  }
  backToCreateArticle() {
    this.articleIdToUpdate = null;
    this.usertypeForm.reset();
    this.processValidation = false;
  }
   myFunction() {
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
onPreviousNextPage(){
  for (let i = 1; i <= 100; i++) {
    this.collection.push(`attendance ${i}`);
  }
}
}

