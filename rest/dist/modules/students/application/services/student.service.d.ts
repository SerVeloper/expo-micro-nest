import { StudentEntity } from "../../domain/entities/student.entity";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { UpdateStudentDto } from "../dtos/update-student.dto";
import { CreateStudentUseCase } from "../use-cases/create-student.use-case";
import { DeleteStudentUseCase } from "../use-cases/delete-student.use-case";
import { FindAllStudentsUseCase } from "../use-cases/find-all-students.use-case.";
import { FindByIdStudentUseCase } from "../use-cases/find-by-id-student.use-case";
import { UpdateStudentUseCase } from "../use-cases/update-student.use-case";
export declare class StudentService {
    private readonly createStudentUseCase;
    private readonly findAllStudentsUseCase;
    private readonly findByIdStudentUseCase;
    private readonly updateStudentUseCase;
    private readonly deleteStudentUseCase;
    constructor(createStudentUseCase: CreateStudentUseCase, findAllStudentsUseCase: FindAllStudentsUseCase, findByIdStudentUseCase: FindByIdStudentUseCase, updateStudentUseCase: UpdateStudentUseCase, deleteStudentUseCase: DeleteStudentUseCase);
    create(createStudentDto: CreateStudentDto): Promise<StudentEntity>;
    findAll(): Promise<StudentEntity[]>;
    findById(id: number): Promise<StudentEntity>;
    update(id: number, updateStudentDto: UpdateStudentDto): Promise<StudentEntity>;
    delete(id: number): Promise<void>;
}
