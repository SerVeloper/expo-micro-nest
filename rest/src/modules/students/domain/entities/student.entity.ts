export class StudentEntity {
    constructor(
        public studentId: number,
        public ci: string,
        public cu: string,
        public name: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public isActive: boolean,
        public createAt: Date,
        public updateAt: Date,
        public deleteAt: Date | null
    ){}
}
