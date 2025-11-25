import { createApp } from './app.js'

const app = await createApp()
const port: number = Number(process.env.PORT) || 3000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  console.log(`REST API at http://localhost:${port}/api/hello`)
  console.log(`GraphQL API at http://localhost:${port}/graphql`)
  console.log(`Swagger UI at http://localhost:${port}/api-docs`)
})
