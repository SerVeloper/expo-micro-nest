import { StudentRepositoryInterface } from '../../domain/interfaces/studen.repository.interface';
export declare class DeleteStudentUseCase {
    private readonly studentRepositoryInterface;
    constructor(studentRepositoryInterface: StudentRepositoryInterface);
    execute(id: number): Promise<void>;
}
