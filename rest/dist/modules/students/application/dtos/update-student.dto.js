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
exports.UpdateStudentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateStudentDto {
}
exports.UpdateStudentDto = UpdateStudentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'ci',
        type: String,
        description: 'Carnet de identidad del estudiante',
        example: '12345678'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentDto.prototype, "ci", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'cu',
        type: String,
        description: 'Carnet universitario del estudiante',
        example: 'U123456'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentDto.prototype, "cu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'name',
        type: String,
        description: 'Nombre del estudiante',
        example: 'Juan'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'lastName',
        type: String,
        description: 'Apellido del estudiante',
        example: 'Pérez'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'email',
        type: String,
        description: 'Correo electrónico del estudiante',
        example: 'juan.perez@example.com'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateStudentDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'phone',
        type: String,
        description: 'Número de teléfono del estudiante',
        example: '123456789'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'address',
        type: String,
        description: 'Dirección del estudiante',
        example: 'Calle Falsa 123'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateStudentDto.prototype, "address", void 0);
//# sourceMappingURL=update-student.dto.js.map