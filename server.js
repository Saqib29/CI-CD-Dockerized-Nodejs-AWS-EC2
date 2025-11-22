import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const port = 3000;

// Swagger Configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js Server API",
      version: "1.0.0",
      description: "A basic Node.js server with REST and GraphQL APIs",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./server.js"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// REST API
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from REST API" });
});

// GraphQL API
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL API",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

await server.start();

app.use(
  "/graphql",
  (req, res, next) => {
    if (!req.body) req.body = {};
    next();
  },
  expressMiddleware(server)
);

// REST API
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from REST API" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`REST API at http://localhost:${port}/api/hello`);
  console.log(`GraphQL API at http://localhost:${port}/graphql`);
});
