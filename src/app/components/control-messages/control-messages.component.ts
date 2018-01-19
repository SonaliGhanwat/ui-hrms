import { Component, OnInit,Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.css']
})
export class ControlMessagesComponent implements OnInit {

  errorMessages: string;
  @Input() control: FormControl;
  @Input() group: FormGroup;
  constructor() { }

  get errorMessage() {
    
    for (let propertyName in this.control.errors) {
      console.log('propertyName : ', propertyName);
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched ) {
        console.log('inside if propertyName : ', propertyName)
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    
    return null;
  }

  ngOnInit() {
  }

}
