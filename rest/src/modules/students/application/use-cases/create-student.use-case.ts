import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { StudentEntity } from '../../domain/entities/student.entity';
import { CreateStudentDto } from '../dtos/create-student.dto';
import { StudentRepositoryInterface } from '../../domain/interfaces/studen.repository.interface';

@Injectable()
export class CreateStudentUseCase {
    constructor(
        @Inject('StudentRepositoryInterface')
        private readonly studentRepositoryInterface: StudentRepositoryInterface 
    ) {}

    async execute( createStudentDto: CreateStudentDto ): Promise<StudentEntity> {
        
        const newStudent = {
            ...createStudentDto,
            isActive: true,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null
        };

        try {
            return await this.studentRepositoryInterface.create(newStudent);
        } catch (error) {
            throw new BadRequestException('Error creating student');
        }
    }
        
}