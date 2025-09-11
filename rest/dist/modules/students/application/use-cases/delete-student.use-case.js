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
exports.DeleteStudentUseCase = void 0;
const common_1 = require("@nestjs/common");
let DeleteStudentUseCase = class DeleteStudentUseCase {
    constructor(studentRepositoryInterface) {
        this.studentRepositoryInterface = studentRepositoryInterface;
    }
    async execute(id) {
        const student = await this.studentRepositoryInterface.findById(id);
        if (!student) {
            throw new common_1.BadRequestException(`Estudiante con id ${id} no encontrado`);
        }
        if (!student.isActive) {
            throw new common_1.BadRequestException(`El estudiante con id ${id} ya está eliminado`);
        }
        try {
            await this.studentRepositoryInterface.delete(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error al eliminar el estudiante con id ${id}`);
        }
    }
};
exports.DeleteStudentUseCase = DeleteStudentUseCase;
exports.DeleteStudentUseCase = DeleteStudentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('StudentRepositoryInterface')),
    __metadata("design:paramtypes", [Object])
], DeleteStudentUseCase);
//# sourceMappingURL=delete-student.use-case.js.map