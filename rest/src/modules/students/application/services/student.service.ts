import { Injectable } from "@nestjs/common";
import { StudentEntity } from "../../domain/entities/student.entity";
import { CreateStudentDto } from "../dtos/create-student.dto";
import { UpdateStudentDto } from "../dtos/update-student.dto";
import { CreateStudentUseCase } from "../use-cases/create-student.use-case";
import { DeleteStudentUseCase } from "../use-cases/delete-student.use-case";
import { FindAllStudentsUseCase } from "../use-cases/find-all-students.use-case.";
import { FindByIdStudentUseCase } from "../use-cases/find-by-id-student.use-case";
import { UpdateStudentUseCase } from "../use-cases/update-student.use-case";

@Injectable()
export class StudentService {
    constructor(
        private readonly createStudentUseCase: CreateStudentUseCase,
        private readonly findAllStudentsUseCase: FindAllStudentsUseCase,
        private readonly findByIdStudentUseCase: FindByIdStudentUseCase,
        private readonly updateStudentUseCase: UpdateStudentUseCase,
        private readonly deleteStudentUseCase: DeleteStudentUseCase
    ) {}

    async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
        return this.createStudentUseCase.execute(createStudentDto);
    }

    async findAll(): Promise<StudentEntity[]> {
        return this.findAllStudentsUseCase.execute();
    }

    async findById(id: number): Promise<StudentEntity> {
        return this.findByIdStudentUseCase.execute(id);
    }

    async update(id: number, updateStudentDto: UpdateStudentDto): Promise<StudentEntity> {
        return this.updateStudentUseCase.execute(id, updateStudentDto);
    }

    async delete(id: number): Promise<void> {
        return this.deleteStudentUseCase.execute(id);
    }
}