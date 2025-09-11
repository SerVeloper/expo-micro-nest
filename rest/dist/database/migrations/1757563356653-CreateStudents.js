"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStudents1757563356653 = void 0;
const typeorm_1 = require("typeorm");
class CreateStudents1757563356653 {
    constructor() {
        this.name = 'CreateStudents1757563356653';
    }
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "students",
            columns: [
                { name: "student_id", type: "serial", isPrimary: true },
                { name: "ci", type: "varchar", length: "100", isUnique: true },
                { name: "cu", type: "varchar", length: "100", isUnique: true },
                { name: "name", type: "varchar", length: "255" },
                { name: "last_name", type: "varchar", length: "255" },
                { name: "email", type: "varchar", length: "255", isUnique: true },
                { name: "phone", type: "varchar", length: "20" },
                { name: "is_active", type: "boolean", default: true },
                { name: "create_at", type: "timestamp", default: "now()" },
                { name: "update_at", type: "timestamp", default: "now()" },
                { name: "delete_at", type: "timestamp", isNullable: true, default: null },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("students");
    }
}
exports.CreateStudents1757563356653 = CreateStudents1757563356653;
//# sourceMappingURL=1757563356653-CreateStudents.js.map