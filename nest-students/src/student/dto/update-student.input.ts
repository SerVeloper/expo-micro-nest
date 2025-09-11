import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateStudentInput } from './create-student.input';
import { IsEmail, IsOptional } from 'class-validator';

@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentInput) {
  @Field(() => String, { nullable: true })
  @IsEmail()
  @IsOptional()
  email?: string;
}