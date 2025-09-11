import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('students')
export class StudentOrmEntity {
    @PrimaryGeneratedColumn({ name: 'student_id' })
    studentId: number;

    @Column({ name: 'ci', type: 'varchar', length: 100, nullable: false, unique: true })
    ci: string;

    @Column({ name: 'cu', type: 'varchar', length: 100, nullable: false, unique: true })
    cu: string;

    @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: false })
    lastName: string;

    @Column({ name: 'email', type: 'varchar', length: 255, nullable: false, unique: true })
    email: string;

    @Column({ name: 'phone', type: 'varchar', length: 20, nullable: false })
    phone: string;

    @Column({ name: 'is_active', type: 'boolean', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'create_at', type: 'timestamp' })
    createAt: Date;

    @UpdateDateColumn({ name: 'update_at', type: 'timestamp' })
    updateAt: Date;

    @DeleteDateColumn({ name: 'delete_at', type: 'timestamp', nullable: true })
    deleteAt: Date | null;
}