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
exports.CreateStudentUseCase = void 0;
const common_1 = require("@nestjs/common");
let CreateStudentUseCase = class CreateStudentUseCase {
    constructor(studentRepositoryInterface) {
        this.studentRepositoryInterface = studentRepositoryInterface;
    }
    async execute(createStudentDto) {
        const newStudent = {
            ...createStudentDto,
            isActive: true,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null
        };
        try {
            return await this.studentRepositoryInterface.create(newStudent);
        }
        catch (error) {
            throw new common_1.BadRequestException('Error creating student');
        }
    }
};
exports.CreateStudentUseCase = CreateStudentUseCase;
exports.CreateStudentUseCase = CreateStudentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('StudentRepositoryInterface')),
    __metadata("design:paramtypes", [Object])
], CreateStudentUseCase);
//# sourceMappingURL=create-student.use-case.js.map