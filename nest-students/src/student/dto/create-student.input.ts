import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @Field()
  @IsNotEmpty()
  ci: string;

  @Field()
  @IsNotEmpty()
  cu: string;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  last_name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  phone: string;

  @Field({ defaultValue: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
