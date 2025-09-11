import { StudentEntity } from "../../domain/entities/student.entity";
import { CreateStudentDto } from "../../application/dtos/create-student.dto";
import { UpdateStudentDto } from "../../application/dtos/update-student.dto";
import { StudentService } from "../../application/services/student.service";
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    create(createStudentDto: CreateStudentDto): Promise<StudentEntity>;
    findAll(): Promise<StudentEntity[]>;
    findOne(id: number): Promise<StudentEntity>;
    update(id: number, updateStudentDto: UpdateStudentDto): Promise<StudentEntity>;
    remove(id: number): Promise<void>;
}
