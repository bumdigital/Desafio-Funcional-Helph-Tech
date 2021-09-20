const { ApolloServer, gql } = require('apollo-server');

//CREATE DATABASE
let books = [];

const typeDefs = gql`
  type Book {
        id: ID!
        title: String
        author: String
        publishedAt: Int
    }

    type Query {
        books: [Book]
        book(id: ID!): Book
    }

    type Mutation {
        abrirConta(id: ID!, title: String!, author: String!, publishedAt: Int!): Book
        sacar(id: ID!, title: String!, author: String!, publishedAt: Int!): Book
        depositar(id: ID!): Boolean
        saldo(id: ID!, title: String, author: String, publishedAt: Int): Book
    }
`;

const resolvers = {
  Query: {
    books: () => {
      return books;
    },
    book: (_, { id }) => {
      return books.find((book) => book.id === id);
    },
  },

  Mutation: {
    abrirConta: (_, { id, title, author, publishedAt }) => {
      const book = { id, title, author, publishedAt };
      books.push(book);
      return book;
    },
    sacar: (_, { id, title, author, publishedAt }) => {
      const book = { id, title, author, publishedAt };
      books.push(book);
      return book;
    },
    depositar: (_, { id }) => {
      const filteredBooks = books.filter((book) => book.id !== id);
      books = filteredBooks;
      return true;
    },
    saldo: (_, { id, title, author, publishedAt }) => {
      const book = books.find((book) => book.id === id);
      book.id = book.id
      book.title = title ? title : book.title;
      book.author = author ? author : book.author;
      book.publishedAt = publisheAt ? publishedAt : book.publishedAt;
      return book;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen({ port: 9000 })
  .then(({ url }) => console.log(`Server running at ${url}`));