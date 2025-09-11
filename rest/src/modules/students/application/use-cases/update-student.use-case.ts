import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { StudentEntity } from "../../domain/entities/student.entity";
import { UpdateStudentDto } from "../dtos/update-student.dto";
import { StudentRepositoryInterface } from "../../domain/interfaces/studen.repository.interface";

@Injectable()
export class UpdateStudentUseCase {
    constructor(
        @Inject('StudentRepositoryInterface')
        private readonly studentRepositoryInterface: StudentRepositoryInterface
    ){}

    async execute(id: number, updateStudentDto: UpdateStudentDto): Promise<StudentEntity> {
        const student = await this.studentRepositoryInterface.findById(id);
        if (!student) {
            throw new BadRequestException(`Estudiante con id ${id} no encontrado`);
        }
        const updatedStudent = { ...student, ...updateStudentDto };
        try{
            return await this.studentRepositoryInterface.update(id, updatedStudent);
        } catch (error) {
            throw new BadRequestException(`Error al actualizar estudiante con id ${id}`);
        }
    }
}