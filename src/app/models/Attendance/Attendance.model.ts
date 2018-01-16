export class Attendance {
    constructor(
        public id:string,
        public employee:number,
        public intime:string,
        public outtime:string,
        public date:Date
    ){}
}