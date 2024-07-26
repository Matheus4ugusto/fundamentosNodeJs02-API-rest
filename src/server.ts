import {app} from './app'
import { env } from './env'



app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server Running on 127.0.0.1:3333')
})
