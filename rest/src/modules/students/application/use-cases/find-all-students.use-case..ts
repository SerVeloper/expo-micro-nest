import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { StudentEntity } from "../../domain/entities/student.entity";
import { StudentRepositoryInterface } from "../../domain/interfaces/studen.repository.interface";

@Injectable()
export class FindAllStudentsUseCase {
    constructor(
        @Inject('StudentRepositoryInterface')
        private readonly studentRepositoryInterface: StudentRepositoryInterface
    ) {}

    async execute(): Promise<StudentEntity[]> {
        try {
            return await this.studentRepositoryInterface.findAll();
        } catch (error) {
            throw new BadRequestException('Error al buscar estudiantes');
        }
    }
}