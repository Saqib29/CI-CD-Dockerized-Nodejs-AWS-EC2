import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'
import { typeDefs } from './graphql/schema.js'
import { resolvers } from './graphql/resolvers.js'
import restRoutes from './routes/rest.js'
import { RequestHandler, Express } from 'express'

export async function createApp(): Promise<Express> {
  const app = express()
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/api', restRoutes)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
  })

  await server.start()

  app.use(
    '/graphql',
    (req: { body: unknown }, _res: unknown, next: () => void) => {
      if (!req.body) {
        req.body = {} as unknown
      }
      next()
    },
    expressMiddleware(server) as unknown as RequestHandler,
  )

  return app
}

export default createApp
