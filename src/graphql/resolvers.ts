export const resolvers = {
  Query: {
    hello: (): string => "Hello from GraphQL API",
    healthCheck: (): string => "OK",
  }
};
