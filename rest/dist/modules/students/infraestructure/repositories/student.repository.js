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
exports.StudentRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const student_entity_1 = require("../../domain/entities/student.entity");
const student_orm_entity_1 = require("./student.orm.entity");
let StudentRepository = class StudentRepository {
    constructor(repository) {
        this.repository = repository;
    }
    toOrmEntity(domain) {
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
    toDomainEntity(entity) {
        return new student_entity_1.StudentEntity(entity.studentId, entity.ci, entity.cu, entity.name, entity.lastName, entity.email, entity.phone, entity.isActive ?? true, entity.createAt, entity.updateAt, entity.deleteAt);
    }
    async create(student) {
        const entity = this.repository.create(student);
        const savedEntity = await this.repository.save(entity);
        return this.toDomainEntity(savedEntity);
    }
    async findAll() {
        const entities = await this.repository.find({ where: { isActive: true } });
        return entities.map(entity => this.toDomainEntity(entity));
    }
    async findById(id) {
        const entity = await this.repository.findOne({ where: { studentId: id, isActive: true } });
        return entity ? this.toDomainEntity(entity) : null;
    }
    async update(id, student) {
        const existingEntity = await this.repository.findOne({ where: { studentId: id, isActive: true } });
        if (!existingEntity) {
            throw new common_1.NotFoundException(`Estudiante con ID ${id} no encontrado`);
        }
        const mergedEntity = this.repository.merge(existingEntity, this.toOrmEntity(student), { updateAt: new Date() });
        const updatedEntity = await this.repository.save(mergedEntity);
        return this.toDomainEntity(updatedEntity);
    }
    async delete(id) {
        const existingEntity = await this.repository.findOne({ where: { studentId: id, isActive: true } });
        if (!existingEntity) {
            throw new common_1.NotFoundException(`Estudiante con ID ${id} no encontrado`);
        }
        await this.repository.update(id, { isActive: false, deleteAt: new Date() });
    }
};
exports.StudentRepository = StudentRepository;
exports.StudentRepository = StudentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_orm_entity_1.StudentOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StudentRepository);
//# sourceMappingURL=student.repository.js.map