import { Juros, PagamentoData, ProdutoData } from '../util/interfaces'
import juros from '../util/juros'

export default class CompraService {
  public static testing (): String {
    return 'success'
  }

  public static async comprar (produto: ProdutoData, condicaoPagamento: PagamentoData): Promise<Juros[] | Error> {
    try {
      const result = await juros(produto, condicaoPagamento)
      return result
    } catch (e) {
      throw new Error('AxiosError')
    }
  }
}
