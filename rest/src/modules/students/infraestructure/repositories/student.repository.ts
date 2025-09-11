import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from '../../domain/entities/student.entity';
import { StudentOrmEntity } from './student.orm.entity';
import { StudentRepositoryInterface } from '../../domain/interfaces/studen.repository.interface';

@Injectable()
export class StudentRepository implements StudentRepositoryInterface {
  constructor(
    @InjectRepository(StudentOrmEntity)
    private readonly repository: Repository<StudentOrmEntity>,
  ) {}

  private toOrmEntity(domain: Partial<StudentEntity>): Partial<StudentOrmEntity> {
    return {
      studentId: domain.studentId,
      ci: domain.ci,
      cu: domain.cu,
      name: domain.name,
      lastName: domain.lastName,
      email: domain.email,
      phone: domain.phone,
      isActive: domain.isActive ?? true,
      createAt: domain.createAt,
      updateAt: domain.updateAt,
      deleteAt: domain.deleteAt,
    };
  }

  private toDomainEntity(entity: StudentOrmEntity): StudentEntity {
    return new StudentEntity(
      entity.studentId,
      entity.ci,
      entity.cu,
      entity.name,
      entity.lastName,
      entity.email,
      entity.phone,
      entity.isActive ?? true,
      entity.createAt,
      entity.updateAt,
      entity.deleteAt
    );
  }

  async create(student: Omit<StudentEntity, 'studentId' | 'isActive' | 'createAt' | 'updateAt' | 'deleteAt'>): Promise<StudentEntity> {
    const entity = this.repository.create(student);
    const savedEntity = await this.repository.save(entity);
    return this.toDomainEntity(savedEntity);
  }

  async findAll(): Promise<StudentEntity[]> {
    const entities = await this.repository.find({ where: { isActive: true } });
    return entities.map(entity => this.toDomainEntity(entity));
  }

  async findById(id: number): Promise<StudentEntity | null> {
    const entity = await this.repository.findOne({ where: { studentId: id, isActive: true } });
    return entity ? this.toDomainEntity(entity) : null;
  }

  async update(id: number, student: Partial<Omit<StudentEntity, 'studentId' | 'isActive' | 'createAt' | 'updateAt' | 'deleteAt'>>): Promise<StudentEntity> {
    const existingEntity = await this.repository.findOne({ where: { studentId: id, isActive: true } });
    if (!existingEntity) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    const mergedEntity = this.repository.merge(existingEntity, this.toOrmEntity(student), { updateAt: new Date() });
    const updatedEntity = await this.repository.save(mergedEntity);
    return this.toDomainEntity(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    const existingEntity = await this.repository.findOne({ where: { studentId: id, isActive: true } });
    if (!existingEntity) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    await this.repository.update(id, { isActive: false, deleteAt: new Date() });
  }

}