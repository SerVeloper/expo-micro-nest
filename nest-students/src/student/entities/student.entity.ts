import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('students')
export class Student {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  student_id: number;

  @Field()
  @Column({ length: 20, unique: true })
  ci?: string;

  @Field()
  @Column({ length: 20, unique: true })
  cu?: string;

  @Field()
  @Column({ length: 100 })
  name?: string;

  @Field()
  @Column({ length: 100 })
  last_name?: string;

  @Field()
  @Column({ length: 100, unique: true })
  email?: string;

  @Field()
  @Column({ length: 20 })
  phone?: string;

  @Field()
  @Column({ default: true })
  is_active?: boolean;

  @Field()
  @CreateDateColumn()
  create_at?: Date;

  @Field()
  @UpdateDateColumn()
  update_at?: Date;

  @Field(() => Date, { nullable: true }) // Corrección aquí
  @DeleteDateColumn()
  delete_at?: Date | null;
}
