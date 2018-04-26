export class Employee {
    constructor(

        public id: number,
        public userid: String,
        public password: String,
        public firstName: String,
        public lastName: String,
        public phoneNumber: number,
        public emailid: String,
        public dateOfJoining: Date,
        public dateOfBirth: Date,
        public address: String,
        public department: any,
        public salary: String,
        public reportTo: any,
        public usertype: any,
        public employeetype: any,
        public designation: any
        
    ) { }
}