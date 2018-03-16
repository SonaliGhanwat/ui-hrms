import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceComponent } from '../../app/components/attendance/attendance.component';

@Injectable()
export class ValidationService {
    constructor() { }



    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const config = {
            'required': 'Required',
            'invalidPassword': 'Password must be at least 6 characters long',
            'invalidEmail': 'EmailId Not Valid',
            'invalidDate': 'Enter Current date',
            'pastDate': 'Do not Enter Past Date',
            'ToDate': 'Invalid Date! To joining date  should be greater then from date',
            'minlength': `Name should 4 character long${validatorValue.requiredLength}`,
            'dateOfBirth': 'Date of Birth should be 18 year old'
        };
        return config[validatorName];
    }
    static passwordValidator(control) {
        // console.log("control", control)
        if (control.value.match(/^[a-zA-Z0-9!@#$%^&*]{4,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
    static emailValidator(control) {
        const email = control.value;
        // console.log("email", email);
        if (control.value.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{3})$/)) {
            return null;
        } else {
            return { 'invalidEmail': true };
        }
    }

    static currentDateValidation(control) {
        const joinDate = new Date();
        // const getdate = joinDate.getDate();
        // const getMonth = joinDate.getMonth() + 1;
        const getAttendncedate = control.value;
        const attendanceDate = new Date(getAttendncedate);
        // const getAttendate = attendanceDate.getDate();
        // let getAttenMonth = attendanceDate.getMonth() + 1;
        const newdate = joinDate.getMonth() + 1 + '-' + joinDate.getDate();
        const AttendanceDate1 = attendanceDate.getMonth() + 1 + '-' + attendanceDate.getDate();
        if (newdate === AttendanceDate1) {
            return null;
        } else {
            return { 'invalidDate': true };
        }
    }
    static dateValidation(control) {
        const joinDate = new Date();
        // const getdate = joinDate.getDate();
        // const getMonth = joinDate.getMonth() + 1;
        const getAttendncedate = control.value;
        const attendanceDate = new Date(getAttendncedate);
        // const getAttendate = attendanceDate.getDate();
        // const getAttenMonth = attendanceDate.getMonth() + 1;
        const newdate = joinDate.getMonth() + 1 + '-' + joinDate.getDate();
        const AttendanceDate1 = attendanceDate.getMonth() + 1 + '-' + attendanceDate.getDate();
        if (newdate === AttendanceDate1) {
            return null;
        } else if (newdate > AttendanceDate1) {
            return { 'pastDate': true };
        }
    }

    static dateOfBirthValidation(control) {
        const currentdate = new Date();
        const currentyearonly = currentdate.getFullYear();
        const usrdob = control.value;
        const dateEntered = new Date(usrdob);
        const data = dateEntered.getFullYear();
        const res = currentyearonly - data;
        if (res >= 18) {
        } else {
            return { 'dateOfBirth': true };
        }
    }
    static outTimeValidation(control) {
        console.log('control :', control);
    }
}
