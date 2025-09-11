import { StudentEntity } from "../entities/student.entity";

export interface StudentRepositoryInterface {
    create(studentEntity: Omit<StudentEntity, 'studentId' | 'isActive' |'createAt' | 'updateAt' | 'deleteAt'>): Promise<StudentEntity>;
    findAll(): Promise<StudentEntity[]>;
    findById(id: number): Promise<StudentEntity | null>;
    update(id: number, studentEntity: Partial<Omit<StudentEntity, 'studentId' | 'isActive' | 'createAt' | 'updateAt' | 'deleteAt'>>): Promise<StudentEntity>;
    delete(id: number): Promise<void>;
}