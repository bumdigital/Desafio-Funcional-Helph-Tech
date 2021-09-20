const { ApolloServer, gql } = require('apollo-server');

//CREATE DATABASE
let clientes = [];

const typeDefs = gql`
  type Cliente {
        conta: ID!
        titular: String
        saldo: Int
    }

    type Query {
        clientes: [Cliente]
        cliente(conta: ID!): Cliente
    }

    type Mutation {
        abrirConta(conta: ID!, titular: String!, saldo: Int!): Cliente
        sacar(conta: ID!, titular: String!, saldo: Int!): Cliente
        depositar(conta: ID!): Boolean
        saldo(conta: ID!, titular: String, saldo: Int): Cliente
    }
`;

const resolvers = {
  Query: {
    clientes: () => {
      return clientes;
    },
    cliente: (_, { conta }) => {
      return clientes.find((cliente) => cliente.conta === conta);
    },
  },

  Mutation: {
    abrirConta: (_, { conta, titular, saldo }) => {
      const cliente = { conta, titular, saldo };
      clientes.push(cliente);
      return cliente;
    },
    sacar: (_, { conta, titular, saldo }) => {
      const cliente = { conta, titular, saldo };
      clientes.push(cliente);
      return cliente;
    },
    depositar: (_, { conta }) => {
      const filteredClientes = clientes.filter((cliente) => cliente.conta !== conta);
      clientes = filteredClientes;
      return true;
    },
    saldo: (_, { conta, titular, saldo }) => {
      const cliente = clientes.find((cliente) => cliente.conta === conta);
      cliente.conta = cliente.conta
      cliente.titular = titular ? titular : cliente.titular;
      cliente.saldo = saldo ? saldo : cliente.saldo;
      return cliente;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server
  .listen({ port: 9000 })
  .then(({ url }) => console.log(`Server running at ${url}`));