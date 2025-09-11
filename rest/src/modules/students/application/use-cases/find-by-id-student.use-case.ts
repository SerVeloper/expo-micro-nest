import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { StudentEntity } from "../../domain/entities/student.entity";
import { StudentRepositoryInterface } from "../../domain/interfaces/studen.repository.interface";

export class FindByIdStudentUseCase {
    constructor(
        @Inject('StudentRepositoryInterface')
        private readonly studentRepositoryInterface: StudentRepositoryInterface
    ){}

    async execute(id: number): Promise<StudentEntity> {
        try{
            const student = await this.studentRepositoryInterface.findById(id);
            if (!student) {
                throw new BadRequestException(`Estudiante con id ${id} no encontrado`);
            }
            return student;
        } catch (error) {
            throw new BadRequestException(`Error al buscar estudiante con id ${id}`);
        }
    }
}