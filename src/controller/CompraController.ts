import CompraService from '../service/CompraService'
import { Request, Response } from 'express'

export default class CompraController {
  static testing (req: Request, res: Response): void {
    const result = CompraService.testing()
    res.status(200).send({ message: result })
  }
}
