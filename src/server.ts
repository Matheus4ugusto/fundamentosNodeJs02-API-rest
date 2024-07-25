import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'
import { transactionRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionRoutes, {
  prefix: 'transactions'
})

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server Running on 127.0.0.1:3333')
})
