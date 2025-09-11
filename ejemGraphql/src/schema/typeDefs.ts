import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Student {
    studentId: ID!
    ci: String!
    cu: String!
    name: String!
    lastName: String!
    email: String
    phone: String
    isActive: Boolean!
    createAt: String!
    updateAt: String!
    deleteAt: String
  }

  input StudentInput {
    ci: String!
    cu: String!
    name: String!
    lastName: String!
    email: String
    phone: String
  }

  type Query {
    getStudents: [Student!]!
    getStudentById(studentId: ID!): Student
  }

  type Mutation {
    createStudent(input: StudentInput!): Student!
    updateStudent(studentId: ID!, input: StudentInput!): Student!
    deleteStudent(studentId: ID!): Boolean!
  }
`;
