"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const student_orm_entity_1 = require("./infraestructure/repositories/student.orm.entity");
const student_repository_1 = require("./infraestructure/repositories/student.repository");
const student_service_1 = require("./application/services/student.service");
const student_controller_1 = require("./infraestructure/controllers/student.controller");
const create_student_use_case_1 = require("./application/use-cases/create-student.use-case");
const find_all_students_use_case_1 = require("./application/use-cases/find-all-students.use-case.");
const find_by_id_student_use_case_1 = require("./application/use-cases/find-by-id-student.use-case");
const update_student_use_case_1 = require("./application/use-cases/update-student.use-case");
const delete_student_use_case_1 = require("./application/use-cases/delete-student.use-case");
let StudentModule = class StudentModule {
};
exports.StudentModule = StudentModule;
exports.StudentModule = StudentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([student_orm_entity_1.StudentOrmEntity])],
        controllers: [student_controller_1.StudentController],
        providers: [
            {
                provide: "StudentRepositoryInterface",
                useClass: student_repository_1.StudentRepository,
            },
            student_service_1.StudentService,
            create_student_use_case_1.CreateStudentUseCase,
            find_all_students_use_case_1.FindAllStudentsUseCase,
            find_by_id_student_use_case_1.FindByIdStudentUseCase,
            update_student_use_case_1.UpdateStudentUseCase,
            delete_student_use_case_1.DeleteStudentUseCase,
        ],
        exports: [student_service_1.StudentService],
    })
], StudentModule);
//# sourceMappingURL=student.module.js.map