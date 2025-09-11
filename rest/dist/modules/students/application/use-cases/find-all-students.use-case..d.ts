import { StudentEntity } from "../../domain/entities/student.entity";
import { StudentRepositoryInterface } from "../../domain/interfaces/studen.repository.interface";
export declare class FindAllStudentsUseCase {
    private readonly studentRepositoryInterface;
    constructor(studentRepositoryInterface: StudentRepositoryInterface);
    execute(): Promise<StudentEntity[]>;
}
