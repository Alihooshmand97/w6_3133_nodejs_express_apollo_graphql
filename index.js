const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema'); // Import GraphQL schema
const resolvers = require('./resolvers'); // Import GraphQL resolvers

dotenv.config(); // Load environment variables from .env file

const mongodb_atlas_url = process.env.MONGODB_URL; // Get MongoDB URL from .env

// Connect to MongoDB
mongoose.connect(mongodb_atlas_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB: ', err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

// Middleware setup for CORS and JSON body parsing
app.use(express.json());
app.use('*', cors());

// Start the Apollo Server and apply it as middleware to Express
const startServer = async () => {
  await server.start(); // Start Apollo Server
  server.applyMiddleware({ app }); // Apply Apollo Server middleware to Express

  // Start the Express server
  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
  });
};

startServer(); // Start the server
