import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    userAdd(firstName: String, lastName: String, email: String): User
    userUpdate(
      id: ID!
      firstName: String
      lastName: String
      email: String
    ): User
    userDelete(id: ID!): User
  }

  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
  }
`;

export default typeDefs;
