import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('students')
export class Student {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  studentId: number;

  @Field()
  @Column({ length: 20, unique: true })
  ci: string;

  @Field()
  @Column({ length: 20, unique: true })
  cu: string;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field()
  @Column({ length: 100 })
  lastName: string;

  @Field()
  @Column({ length: 100, unique: true })
  email: string;

  @Field()
  @Column({ length: 20 })
  phone: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @CreateDateColumn()
  createAt: Date;

  @Field()
  @UpdateDateColumn()
  updateAt: Date;

  @Field(() => Date, { nullable: true }) // Corrección aquí
  @DeleteDateColumn()
  deleteAt: Date | null;
}