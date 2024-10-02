const messageResolvers = require('./resolvers/messageResolvers');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const express = require('express');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');  // Import CORS

const app = express();

const typeDefs = gql`
  type TrainingMessage {
    id: ID!
    text: String!
    classification: String!
    createdAt: String!
  }

  type Query {
    trainingMessages: [TrainingMessage]
  }

  type Mutation {
    addTrainingMessage(text: String!, classification: String!): TrainingMessage
  }
`;

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: messageResolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  app.use(express.json());
  
  // Apply CORS middleware to allow cross-origin requests
  app.use(cors());

  mongoose.connect('mongodb://localhost:27017/bartle-analyzer', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  }).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  app.use('/api', messageRoutes);

  app.listen(4000, () => {
    console.log(`Server running on http://localhost:4000${server.graphqlPath}`);
  });
}

startServer();
