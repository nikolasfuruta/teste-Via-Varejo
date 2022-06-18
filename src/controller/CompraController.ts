import CompraService from '../service/CompraService'
import { Request, Response } from 'express'

export default class CompraController {
  static testing (req: Request, res: Response): void {
    const result = CompraService.testing()
    res.status(200).send({ message: result })
  }

  public static async comprar (req: Request, res: Response): Promise<void> {
    const produto: any = req.body.produto
    const condicaoPagamento: any = req.body.condicaoPagamento
    try {
      const result = await CompraService.comprar(produto, condicaoPagamento)
      res.status(200).send(result)
    } catch (e) {
      res.status(400).send(e)
    }
  }
}
