export class Leave{
    constructor(
        public id:number,
        public employee :number,
        public subject:string,
        public fromDate:Date,
        public toDate:Date,
        public leavetype:number
    ){}
}