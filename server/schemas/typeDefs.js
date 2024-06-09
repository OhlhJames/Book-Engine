const typeDefs = `
  type User {
    _id: ID
    name: String
    email: String
    password: String
    skills: [String]!
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Book {
    authors:[String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    user(userId: ID!): Profile
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook: Book
    deleteBook: Book
  }
`;

module.exports = typeDefs;
