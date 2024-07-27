import {app} from './app'
import { env } from './env'



app.listen({ port: env.PORT }).then(() => {
  host: ("RENDER" in process.env) ? '0.0.0.0' : 'localhost'
  console.log('HTTP Server Running')
})
