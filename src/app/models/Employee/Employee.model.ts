export class Employee {
    constructor(
        public id:number,
        public userid: String,
        public password: String,
        public firstName: String,
        public lastName: String,
        public phoneNumber: number,
        public emailid: String,
        public dateOfJoining: Date,
        public dateOfBirth: Date,
        public address: String,
        public department: String,
        public salary: String,
        public reportTo: number,
        public usertype: number,
        public employeetype: number,
        public designation: number
    ) { }
}