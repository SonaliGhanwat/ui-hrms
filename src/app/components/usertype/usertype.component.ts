
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsertypeService } from './usertype.service';
import { UserType } from './usertype';
@Component({
  selector: 'app-usertype',
  templateUrl: './usertype.component.html',
  styleUrls: ['./usertype.component.css']
})
export class UsertypeComponent implements OnInit {

  allUsertypes: UserType[];
  statusCode: number;
  requestProcessing = false;
  articleIdToUpdate = null;
  processValidation = false;


  usertypeForm = new FormGroup({
    usertypeName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)	   
});

constructor(private usertypeService: UsertypeService){ }

ngOnInit(): void {
  this.getAllUserTypes();
}   
getAllUserTypes() {
  this.usertypeService.getAllUserTypes()
.subscribe(
          data => this.allUsertypes = data,
          errorCode =>  this.statusCode = errorCode);   
}
}
