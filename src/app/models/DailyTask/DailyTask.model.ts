export class DailyTask {
    constructor(

        public id: number,
        public employee: any,
        public date: Date,
        public taskName: string,
        public estimationTime: string,
        public starttime: string,
        public endtime: string,
        public status: string,
        public description: string
        
    ) { }
}