import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AttendanceComponent} from '../../app/components/attendance/attendance.component'

@Injectable()
export class ValidationService {
    constructor() { }
    
   
    
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Required',
            'invalidPassword': 'Password must be at least 6 characters long',
            'invalidEmail': 'EmailId Not Valid',
            'invalidDate': 'Enter Current date',
            'pastDate' : 'Do not Enter Past Date',
            'ToDate' : 'Invalid Date! To joining date  should be greater then from date',
            'minlength': `Minimum length ${validatorValue.requiredLength}`
        };

        return config[validatorName];
    }

    static passwordValidator(control) {

        console.log("control",control)
        if (control.value.match(/^[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
    static emailValidator(control) {
        
                console.log("control",control)
                if (control.value.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{3})$/)) {
                    return null;
                } else {
                    return { 'invalidEmail': true };
                }
            }

    static currentDateValidation(control){
        let joinDate = new Date();
        let getdate = joinDate.getDate();
        let getMonth = joinDate.getMonth()+1;
        let getAttendncedate = control.value; 
        let attendanceDate = new Date(getAttendncedate);
        let getAttendate = attendanceDate.getDate();
        let getAttenMonth = attendanceDate.getMonth()+1;
        let newdate =  getMonth+"-"+ getdate;
        console.log("newdate",newdate)
        let AttendanceDate1 = getAttenMonth+"-"+ getAttendate;
        console.log("AttendanceDate1",AttendanceDate1)
        if (newdate == AttendanceDate1 ) {
			return null;
		}else {
            return { 'invalidDate': true };
        }
    }
    static dateValidation(control){
       
        let joinDate = new Date();
        let getdate = joinDate.getDate();
        let getMonth = joinDate.getMonth()+1;
        let getAttendncedate = control.value; 
        console.log("getAttendncedate",control.value)
        let attendanceDate = new Date(getAttendncedate);
        let getAttendate = attendanceDate.getDate();
        let getAttenMonth = attendanceDate.getMonth()+1;
        let newdate =  getMonth+"-"+ getdate;
        console.log("newdate",newdate)
        let AttendanceDate1 = getAttenMonth+"-"+ getAttendate;
        console.log("AttendanceDate1",AttendanceDate1)
        if (newdate == AttendanceDate1 ) {
			return null;
		}else if(newdate > AttendanceDate1){
            return { 'pastDate': true };
			
        }
    }
   
    static toDateValidation(control){
        console.log("control",control)
        let getFromDate = control.value.fromDate; 
        console.log("getFromDate",getFromDate)
        let fromDate = new Date(getFromDate);
        let getFromdate = fromDate.getDate();
        let getFromMonth = fromDate.getMonth()+1;
        let newfromDate =  getFromMonth+"-"+ getFromdate;
        let getToDate = control.value.toDate; 
        console.log("getToDate",getToDate)
        let toDate = new Date(getToDate);
        let getTodate = toDate.getDate();
        let getToMonth = toDate.getMonth()+1;
        let newToDate =  getToMonth+"-"+ getTodate;
        if (newfromDate <= newToDate) {
            console.log("if block")
        } else if(newToDate == newfromDate){
            return { 'ToDate': true };
        }
    }

}
