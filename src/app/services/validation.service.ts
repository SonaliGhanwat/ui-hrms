import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class ValidationService {

    constructor() { }

    static getValidatorErrorMessage(displayName: string, validatorName: string, validatorValue?: any) {
        // console.log('displayName:',displayName);
        const config = {
            'required': `Please Enter ${displayName}`,
            'requiredPassword': 'Please enter Password',
            'requiredUserid': 'Please enter User Id',
            'invalidPassword': 'Please enter valid Password',
            'invalidUserid': 'Please enter valid User Id',
            'invalidEmail': 'Email Id is not Valid',
            'invalidDate': 'Please enter Todays date',
            'pastDate': 'Please do not enter date less than today.',
            'pastDateofjoining': 'Please enter date only this  month.',
            'specialChracterNotAllowed': 'Please do not enter special characters in User Id',
            'ToDate': 'Invalid Date! To Date should be greater than From date',
            'minlength': `${displayName} should be minimum ${validatorValue.requiredLength} characters long`,
            'pattern': `Please do not enter special characters in User Id`,
            'dateOfBirth': 'Date of Birth should be 18 years before than today',
            'selectEmployeeId': 'Please Select Employee Id',
            'weekendDate': 'On this date is weekend so you can not allow to apply leave  ',
            'invalidMonth': 'Please enter current month and year'
        };

        return config[validatorName];
    }

    /*static passwordValidator(control) {
        // console.log("control", control)
        if (control.value.length === 0) {
            return { 'requiredPassword': true };
        } else if (control.value.match(/^[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    static userIdValidator(control) {
        // console.log("control", control)
        // const userid = ((document.getElementById('userid') as HTMLInputElement).value)
        if (control.value.length === 0) {
            return { 'requiredUserid': true };
        } else if (control.value.match(/^[a-zA-Z0-9]{6,100}$/)) {
            return null;
        } else if (control.value.match(/^[0-9!@#$%^&*]/)) {
             return { 'specialChracterNotAllowed': true };
        } else {
            return { 'invalidUserid': true };
        }
    }   */
    static emailValidator(control) {
        const email = control.value;
        // console.log("email", email);
        if (email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{3})$/)) {
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
    static currentMonthValidation(control) {
        const joinDate = new Date();
        const getAttendncedate = control.value;
        const attendanceDate = new Date(getAttendncedate);
        const newdate = joinDate.getMonth() + 1 + '-' + joinDate.getFullYear();
        const AttendanceDate1 = attendanceDate.getMonth() + 1 + '-' + attendanceDate.getFullYear();
        if (newdate >= AttendanceDate1) {
            return null;
        } else {
            return { 'invalidMonth': true };
        }
    }

    static checkWeekend(control) {
        const date = new Date(control.value);
        if (date.getDay() === 6 || date.getDay() === 0) {
            return { 'weekendDate': true };
        }
    }
    static dateOfJoiningValidation(control) {
        const joinDate = new Date();
        // const getdate = joinDate.getDate();
        // const getMonth = joinDate.getMonth() + 1;
        const getAttendncedate = control.value;
        const attendanceDate = new Date(getAttendncedate);
        // const getAttendate = attendanceDate.getDate();
        // const getAttenMonth = attendanceDate.getMonth() + 1;
        const newdate = joinDate.getMonth() + '-' + joinDate.getFullYear();
        const AttendanceDate1 = attendanceDate.getMonth() + '-' + attendanceDate.getFullYear();
        if (newdate === AttendanceDate1) {
            return null;
        } else if (newdate > AttendanceDate1) {
            return { 'pastDateofjoining': true };
        } else if (newdate < AttendanceDate1) {
            return { 'pastDateofjoining': true };
        }
    }
}
