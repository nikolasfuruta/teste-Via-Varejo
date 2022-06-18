import express, { Express } from 'express'

export default class App {
  init: Express

  constructor () {
    this.init = express()
  }
}
