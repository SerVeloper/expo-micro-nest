import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn()
  studentId!: number;

  @Column({ unique: true })
  ci!: string;

  @Column({ unique: true })
  cu!: string;

  @Column()
  name!: string;

  @Column()
  lastName!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updateAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleteAt!: Date | null;
}
