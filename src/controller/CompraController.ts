import CompraService from '../service/CompraService'
import { Request, Response } from 'express'
import { PagamentoData, ProdutoData } from '../util/interfaces'

export default class CompraController {
  static testing (req: Request, res: Response): void {
    const result = CompraService.testing()
    res.status(200).send({ message: result })
  }

  public static async comprar (req: Request, res: Response): Promise<void> {
    const produto: ProdutoData = req.body.produto
    const condicaoPagamento: PagamentoData = req.body.condicaoPagamento
    try {
      const result = await CompraService.comprar(produto, condicaoPagamento)
      res.status(200).send(result)
    } catch (e) {
      console.error(e)
      res.status(404).send({ message: 'Erro ao conectar no bcb' })
    }
  }
}
