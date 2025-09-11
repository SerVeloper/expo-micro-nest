import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentOrmEntity } from "./infraestructure/repositories/student.orm.entity";
import { StudentRepository } from "./infraestructure/repositories/student.repository";
import { StudentService } from "./application/services/student.service";
import { StudentController } from "./infraestructure/controllers/student.controller";
import { CreateStudentUseCase } from "./application/use-cases/create-student.use-case";
import { FindAllStudentsUseCase } from "./application/use-cases/find-all-students.use-case.";
import { FindByIdStudentUseCase } from "./application/use-cases/find-by-id-student.use-case";
import { UpdateStudentUseCase } from "./application/use-cases/update-student.use-case";
import { DeleteStudentUseCase } from "./application/use-cases/delete-student.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([StudentOrmEntity])],
  controllers: [StudentController],
  providers: [
    {
      provide: "StudentRepositoryInterface",
      useClass: StudentRepository,
    },
    StudentService,
    CreateStudentUseCase,
    FindAllStudentsUseCase,
    FindByIdStudentUseCase,
    UpdateStudentUseCase,
    DeleteStudentUseCase,
  ],
  exports: [StudentService],
})
export class StudentModule {}