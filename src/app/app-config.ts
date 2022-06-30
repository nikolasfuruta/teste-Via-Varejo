import express, { Express, Router } from 'express'
import router from '../routes/CompraRoute'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from '../swagger.json'

export default class App {
  init: Express
  route: Router

  constructor () {
    this.init = express()
    this.mid()
    this.route = this.init.use(router)
  }

  mid () {
    this.init.use(express.json())
    this.init.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
  }
}
