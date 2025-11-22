# Node.js Server with REST and GraphQL

This is a basic Node.js server application that demonstrates how to implement both REST and GraphQL APIs using Express and Apollo Server. It also includes Swagger documentation and Docker support for development and production environments.

## Features

- **REST API**: A simple Hello World endpoint.
- **GraphQL API**: A Hello World query and Health Check.
- **Swagger UI**: Interactive API documentation for REST endpoints.
- **Apollo Sandbox**: Interactive GraphQL IDE.
- **Docker Support**: Dockerfile and Docker Compose configurations for Dev and Prod.
- **Environment Configuration**: Separate `.env` files for different environments.

## Prerequisites

- Node.js (v20 or higher recommended)
- npm (or pnpm/yarn)
- Docker & Docker Compose (optional, for containerization)

## Installation

1.  Clone the repository:

    ```bash
    git clone git@github.com:Saqib29/CI-CD-Dockerized-Nodejs-AWS-EC2.git
    cd CI-CD-Dockerized-Nodejs-AWS-EC2
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Running Locally

### Development

Runs the server with `nodemon` for hot-reloading. Uses `.env` (or defaults).

```bash
npm run dev:local
```

- Server: `http://localhost:3000` (or configured PORT)
- Swagger UI: `http://localhost:3000/api-docs`
- GraphQL Playground: `http://localhost:3000/graphql`

### Production

Runs the server in production mode. Uses `.env` (or defaults).

```bash
npm run start:local
```

## Running with Docker

### Development

Builds and runs the container using the `development` target and `.env.dev` variables.

```bash
docker compose --env-file .env.dev up --build dev
```

- The app will be available at the port defined in `.env.dev` (default `3000` in the provided file).
- Example: `http://localhost:3000/api/hello`

### Production

Builds and runs the container using the `production` target and `.env.prod` variables.

```bash
docker compose --env-file .env.prod up --build prod
```

## API Documentation

### REST API

- **Endpoint**: `GET /api/hello`
- **Response**: `{"message": "Hello from REST API"}`
- **Documentation**: Visit `/api-docs` for the Swagger UI.

### GraphQL API

- **Endpoint**: `POST /graphql`
- **Playground**: Visit `/graphql` in your browser to use the Apollo Sandbox.
- **Schema**:
  ```graphql
  type Query {
    hello: String
    healthCheck: String
  }
  ```

## Project Structure

```
src/
├── config/         # Configuration files (e.g., Swagger)
├── graphql/        # GraphQL schema and resolvers
├── routes/         # REST API routes
└── server.js       # Main application entry point
Dockerfile          # Multi-stage Docker build instructions
docker-compose.yml  # Docker Compose services configuration
.env.dev            # Development environment variables
.env.prod           # Production environment variables
```
