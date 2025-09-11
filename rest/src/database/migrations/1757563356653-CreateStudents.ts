import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudents1757563356653 implements MigrationInterface {
    name = 'CreateStudents1757563356653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
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

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("students");
    }

}
