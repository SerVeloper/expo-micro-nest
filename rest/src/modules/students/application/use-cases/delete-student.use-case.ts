import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { StudentRepositoryInterface } from '../../domain/interfaces/studen.repository.interface';

@Injectable()
export class DeleteStudentUseCase {
    constructor(
        @Inject('StudentRepositoryInterface')
        private readonly studentRepositoryInterface: StudentRepositoryInterface
    ) {}

    async execute(id: number): Promise<void> {
        const student = await this.studentRepositoryInterface.findById(id);
        if (!student) {
            throw new BadRequestException(`Estudiante con id ${id} no encontrado`);
        }
        if (!student.isActive) {
            throw new BadRequestException(`El estudiante con id ${id} ya está eliminado`);
        }
        try {
            await this.studentRepositoryInterface.delete(id);
        } catch (error) {
            throw new BadRequestException(`Error al eliminar el estudiante con id ${id}`);
        }
    }
}