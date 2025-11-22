import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import restRoutes from "./routes/rest.js";

const app = express();
const port = process.env.PORT || 3000;

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// REST API
app.use("/api", restRoutes);

// GraphQL API
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`REST API at http://localhost:${port}/api/hello`);
  console.log(`GraphQL API at http://localhost:${port}/graphql`);
  console.log(`Swagger UI at http://localhost:${port}/api-docs`);
});
