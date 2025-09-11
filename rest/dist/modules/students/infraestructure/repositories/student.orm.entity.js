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
exports.StudentOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let StudentOrmEntity = class StudentOrmEntity {
};
exports.StudentOrmEntity = StudentOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'student_id' }),
    __metadata("design:type", Number)
], StudentOrmEntity.prototype, "studentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ci', type: 'varchar', length: 100, nullable: false, unique: true }),
    __metadata("design:type", String)
], StudentOrmEntity.prototype, "ci", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cu', type: 'varchar', length: 100, nullable: false, unique: true }),
    __metadata("design:type", String)
], StudentOrmEntity.prototype, "cu", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], StudentOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], StudentOrmEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 255, nullable: false, unique: true }),
    __metadata("design:type", String)
], StudentOrmEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone', type: 'varchar', length: 20, nullable: false }),
    __metadata("design:type", String)
], StudentOrmEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], StudentOrmEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'create_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], StudentOrmEntity.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'update_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], StudentOrmEntity.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'delete_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], StudentOrmEntity.prototype, "deleteAt", void 0);
exports.StudentOrmEntity = StudentOrmEntity = __decorate([
    (0, typeorm_1.Entity)('students')
], StudentOrmEntity);
//# sourceMappingURL=student.orm.entity.js.map