import { Repository } from 'typeorm';
import { StudentEntity } from '../../domain/entities/student.entity';
import { StudentOrmEntity } from './student.orm.entity';
import { StudentRepositoryInterface } from '../../domain/interfaces/studen.repository.interface';
export declare class StudentRepository implements StudentRepositoryInterface {
    private readonly repository;
    constructor(repository: Repository<StudentOrmEntity>);
    private toOrmEntity;
    private toDomainEntity;
    create(student: Omit<StudentEntity, 'studentId' | 'isActive' | 'createAt' | 'updateAt' | 'deleteAt'>): Promise<StudentEntity>;
    findAll(): Promise<StudentEntity[]>;
    findById(id: number): Promise<StudentEntity | null>;
    update(id: number, student: Partial<Omit<StudentEntity, 'studentId' | 'isActive' | 'createAt' | 'updateAt' | 'deleteAt'>>): Promise<StudentEntity>;
    delete(id: number): Promise<void>;
}
