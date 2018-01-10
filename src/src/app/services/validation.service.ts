import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {
    constructor() { }
    
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Required',
            'invalidPassword': 'Password must be at least 6 characters long',
            'minlength': `Minimum length ${validatorValue.requiredLength}`
        };

        return config[validatorName];
    }

    static passwordValidator(control) {

        if (control.value.match(/^[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
           
            return { 'invalidPassword': true };

        }
    }
   

}
