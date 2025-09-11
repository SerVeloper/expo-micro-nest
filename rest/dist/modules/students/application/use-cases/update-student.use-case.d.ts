import { StudentEntity } from "../../domain/entities/student.entity";
import { UpdateStudentDto } from "../dtos/update-student.dto";
import { StudentRepositoryInterface } from "../../domain/interfaces/studen.repository.interface";
export declare class UpdateStudentUseCase {
    private readonly studentRepositoryInterface;
    constructor(studentRepositoryInterface: StudentRepositoryInterface);
    execute(id: number, updateStudentDto: UpdateStudentDto): Promise<StudentEntity>;
}
