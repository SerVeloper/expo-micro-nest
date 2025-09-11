import { AppDataSource } from '../data-source';
import { Student } from '../entity/Student';

export const resolvers = {
  Query: {
    getStudents: async () => {
      return await AppDataSource.getRepository(Student).find();
    },
    getStudentById: async (_: any, { studentId }: any) => {
      return await AppDataSource.getRepository(Student).findOneBy({ studentId: Number(studentId) });
    },
  },

  Mutation: {
    createStudent: async (_: any, { input }: any) => {
      const repo = AppDataSource.getRepository(Student);
      const exists = await repo.findOne({ where: [{ ci: input.ci }, { cu: input.cu }] });
      if (exists) throw new Error('CI o CU ya existe');
      const student = repo.create(input);
      return await repo.save(student);
    },

    updateStudent: async (_: any, { studentId, input }: any) => {
      const repo = AppDataSource.getRepository(Student);
      const student = await repo.findOneBy({ studentId: Number(studentId) });
      if (!student) throw new Error('Estudiante no encontrado');
      Object.assign(student, input);
      return await repo.save(student);
    },

    deleteStudent: async (_: any, { studentId }: any) => {
      const repo = AppDataSource.getRepository(Student);
      const student = await repo.findOneBy({ studentId: Number(studentId) });
      if (!student) throw new Error('Estudiante no encontrado');
      await repo.softRemove(student);
      return true;
    }
  }
};
