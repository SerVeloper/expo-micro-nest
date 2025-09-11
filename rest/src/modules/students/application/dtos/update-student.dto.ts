import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class UpdateStudentDto {
  @ApiProperty({
    name: 'ci',
    type: String,
    description: 'Carnet de identidad del estudiante',
    example: '12345678'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  ci?: string;

  @ApiProperty({
    name: 'cu',
    type: String,
    description: 'Carnet universitario del estudiante',
    example: 'U123456'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  cu?: string;

  @ApiProperty({
    name: 'name',
    type: String,
    description: 'Nombre del estudiante',
    example: 'Juan'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    name: 'lastName',
    type: String,
    description: 'Apellido del estudiante',
    example: 'Pérez'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @ApiProperty({
    name: 'email',
    type: String,
    description: 'Correo electrónico del estudiante',
    example: 'juan.perez@example.com'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty({
    name: 'phone',
    type: String,
    description: 'Número de teléfono del estudiante',
    example: '123456789'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  phone?: string;

  @ApiProperty({
    name: 'address',
    type: String,
    description: 'Dirección del estudiante',
    example: 'Calle Falsa 123'
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address?: string;
}
