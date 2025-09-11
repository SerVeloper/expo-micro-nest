import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from "@nestjs/common";
import { StudentEntity } from "../../domain/entities/student.entity";
import { CreateStudentDto } from "../../application/dtos/create-student.dto";
import { UpdateStudentDto } from "../../application/dtos/update-student.dto";
import { StudentService } from "../../application/services/student.service";
import { ApiBearerAuth, ApiResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('students')
@ApiBearerAuth()
@Controller({
    path: 'students',
    version: '1'
})
export class StudentController {
    constructor(
        private readonly studentService: StudentService
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Crear estudiante' })
    @ApiResponse({ status: 201, description: 'El estudiante ha sido creado exitosamente.'})
    @ApiResponse({ status: 400, description: 'Solicitud incorrecta.'})
    @ApiResponse({ status: 401, description: 'No autorizado.'})
    async create(@Body() createStudentDto: CreateStudentDto): Promise<StudentEntity> {
        return this.studentService.create(createStudentDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obtener todos los estudiantes' })
    @ApiResponse({ status: 200, description: 'Lista de estudiantes obtenida exitosamente.'})
    @ApiResponse({ status: 401, description: 'No autorizado.'})
    async findAll(): Promise<StudentEntity[]> {
        return this.studentService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Obtener estudiante por ID' })
    @ApiResponse({ status: 200, description: 'Estudiante obtenido exitosamente.'})
    @ApiResponse({ status: 401, description: 'No autorizado.'})
    @ApiResponse({ status: 404, description: 'Estudiante no encontrado.'})
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<StudentEntity> {
        return this.studentService.findById(id);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Actualizar estudiante por ID' })
    @ApiResponse({ status: 200, description: 'Estudiante actualizado exitosamente.'})
    @ApiResponse({ status: 400, description: 'Solicitud incorrecta.'})
    @ApiResponse({ status: 401, description: 'No autorizado.'})
    @ApiResponse({ status: 404, description: 'Estudiante no encontrado.'})
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateStudentDto: UpdateStudentDto): Promise<StudentEntity> {
        return this.studentService.update(id, updateStudentDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Eliminar estudiante por ID' })
    @ApiResponse({ status: 204, description: 'Estudiante eliminado exitosamente.'})
    @ApiResponse({ status: 401, description: 'No autorizado.'})
    @ApiResponse({ status: 404, description: 'Estudiante no encontrado.'})
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.studentService.delete(id);
    }
}