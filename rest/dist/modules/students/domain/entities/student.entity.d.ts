export declare class StudentEntity {
    studentId: number;
    ci: string;
    cu: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    isActive: boolean;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date | null;
    constructor(studentId: number, ci: string, cu: string, name: string, lastName: string, email: string, phone: string, isActive: boolean, createAt: Date, updateAt: Date, deleteAt: Date | null);
}
