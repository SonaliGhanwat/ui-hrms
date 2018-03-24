import { Component, OnInit, Input } from '@angular/core';
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
  @Input() displayName = '';

  constructor() { }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched && this.control.invalid) {
        return ValidationService.getValidatorErrorMessage(this.displayName, propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }

  ngOnInit() {
  }

}
