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
    user: User
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
    searchGoogleBooks(bookName: String!): String
    user(userId: ID!): User
  }

  type Mutation {

    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook: Book
    deleteBook: Book
  }
`;

module.exports = typeDefs;
