"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const create_student_use_case_1 = require("../use-cases/create-student.use-case");
const delete_student_use_case_1 = require("../use-cases/delete-student.use-case");
const find_all_students_use_case_1 = require("../use-cases/find-all-students.use-case.");
const find_by_id_student_use_case_1 = require("../use-cases/find-by-id-student.use-case");
const update_student_use_case_1 = require("../use-cases/update-student.use-case");
let StudentService = class StudentService {
    constructor(createStudentUseCase, findAllStudentsUseCase, findByIdStudentUseCase, updateStudentUseCase, deleteStudentUseCase) {
        this.createStudentUseCase = createStudentUseCase;
        this.findAllStudentsUseCase = findAllStudentsUseCase;
        this.findByIdStudentUseCase = findByIdStudentUseCase;
        this.updateStudentUseCase = updateStudentUseCase;
        this.deleteStudentUseCase = deleteStudentUseCase;
    }
    async create(createStudentDto) {
        return this.createStudentUseCase.execute(createStudentDto);
    }
    async findAll() {
        return this.findAllStudentsUseCase.execute();
    }
    async findById(id) {
        return this.findByIdStudentUseCase.execute(id);
    }
    async update(id, updateStudentDto) {
        return this.updateStudentUseCase.execute(id, updateStudentDto);
    }
    async delete(id) {
        return this.deleteStudentUseCase.execute(id);
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [create_student_use_case_1.CreateStudentUseCase,
        find_all_students_use_case_1.FindAllStudentsUseCase,
        find_by_id_student_use_case_1.FindByIdStudentUseCase,
        update_student_use_case_1.UpdateStudentUseCase,
        delete_student_use_case_1.DeleteStudentUseCase])
], StudentService);
//# sourceMappingURL=student.service.js.map