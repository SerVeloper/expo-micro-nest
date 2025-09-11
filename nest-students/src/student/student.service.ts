import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async create(createStudentInput: CreateStudentInput): Promise<Student> {
    const student = this.studentRepository.create(createStudentInput);
    return await this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find({
      where: { delete_at: IsNull() },
      order: { create_at: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { student_id: id, delete_at: IsNull() },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(
    id: number,
    updateStudentInput: UpdateStudentInput,
  ): Promise<Student> {
    const student = await this.findOne(id);
    Object.assign(student, updateStudentInput);
    return await this.studentRepository.save(student);
  }

  async remove(id: number): Promise<Student> {
    const student = await this.findOne(id);
    await this.studentRepository.softDelete(id);
    return student;
  }

  async findByCI(ci: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { ci, delete_at: IsNull() },
    });
    if (!student) {
      throw new NotFoundException(`Student with CI ${ci} not found`);
    }
    return student;
  }

  async findByEmail(email: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { email, delete_at: IsNull() },
    });
    if (!student) {
      throw new NotFoundException(`Student with email ${email} not found`);
    }
    return student;
  }
}
