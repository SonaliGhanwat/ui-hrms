export class Leave {
    constructor(

        public id: number,
        public employee: any,
        public subject: string,
        public fromDate: Date,
        public toDate: Date,
        public leavetype: any,
        public emplyeeLeaveParts:any
        
        
    ) { }
}