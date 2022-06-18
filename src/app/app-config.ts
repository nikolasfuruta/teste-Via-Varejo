import express, { Express, Router } from 'express'
import router from '../routes/CompraRoute'

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
  }
}
