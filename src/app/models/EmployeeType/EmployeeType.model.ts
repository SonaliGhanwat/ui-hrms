export class EmployeeType{
    constructor(
        public id: number,
        public type:string,
        public seekLeave:number,
        public paidLeave:number,
        public totalLeave:number
    ){}
}