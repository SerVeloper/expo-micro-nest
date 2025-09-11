import { StudentEntity } from '../../domain/entities/student.entity';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { StudentRepositoryInterface } from '../../domain/interfaces/studen.repository.interface';
export declare class CreateStudentUseCase {
    private readonly studentRepositoryInterface;
    constructor(studentRepositoryInterface: StudentRepositoryInterface);
    execute(createStudentDto: CreateStudentDto): Promise<StudentEntity>;
}
