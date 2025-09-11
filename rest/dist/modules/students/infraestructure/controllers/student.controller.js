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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const create_student_dto_1 = require("../../application/dtos/create-student.dto");
const update_student_dto_1 = require("../../application/dtos/update-student.dto");
const student_service_1 = require("../../application/services/student.service");
const swagger_1 = require("@nestjs/swagger");
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    async create(createStudentDto) {
        return this.studentService.create(createStudentDto);
    }
    async findAll() {
        return this.studentService.findAll();
    }
    async findOne(id) {
        return this.studentService.findById(id);
    }
    async update(id, updateStudentDto) {
        return this.studentService.update(id, updateStudentDto);
    }
    async remove(id) {
        return this.studentService.delete(id);
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Crear estudiante' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'El estudiante ha sido creado exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Solicitud incorrecta.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autorizado.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_student_dto_1.CreateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todos los estudiantes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de estudiantes obtenida exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autorizado.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener estudiante por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estudiante obtenido exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autorizado.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Estudiante no encontrado.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar estudiante por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estudiante actualizado exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Solicitud incorrecta.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autorizado.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Estudiante no encontrado.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_student_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar estudiante por ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Estudiante eliminado exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'No autorizado.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Estudiante no encontrado.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "remove", null);
exports.StudentController = StudentController = __decorate([
    (0, swagger_1.ApiTags)('students'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({
        path: 'students',
        version: '1'
    }),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map