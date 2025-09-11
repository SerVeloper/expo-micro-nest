import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {
    @ApiProperty({
        name: 'ci',
        type: String,
        description: 'Carnet de identidad del estudiante',
        example: '12345678'
    })
    @IsNotEmpty()
    @IsString()
    ci: string;

    @ApiProperty({
        name: 'cu',
        type: String,
        description: 'Carnet universitario del estudiante',
        example: 'U123456'
    })
    @IsNotEmpty()
    @IsString()
    cu: string;

    @ApiProperty({
        name: 'name',
        type: String,
        description: 'Nombre del estudiante',
        example: 'Juan'
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        name: 'lastName',
        type: String,
        description: 'Apellido del estudiante',
        example: 'Pérez'
    })
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @ApiProperty({
        name: 'email',
        type: String,
        description: 'Correo electrónico del estudiante',
        example: 'juan.perez@example.com'
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        name: 'phone',
        type: String,
        description: 'Número de teléfono del estudiante',
        example: '123456789'
    })
    @IsNotEmpty()
    @IsString()
    phone: string;

}