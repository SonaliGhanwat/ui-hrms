export class Attendance {
    constructor(
        public id:string,
        public employee:object,
        public intime:string,
        public outtime:string,
        public date:Date
    ){}
}