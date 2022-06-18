import CompraService from '../service/CompraService'
import { Request, Response } from 'express'

export default class CompraController {
  static testing (req: Request, res: Response): void {
    const result = CompraService.testing()
    res.status(200).send({ message: result })
  }

  // public static async comprar(req: Request, res: Response) {
  //   const info = req.body
  //   try{
  //     const result = await CompraService.comprar(info)
  //   } catch (e) {}
  // }
}
