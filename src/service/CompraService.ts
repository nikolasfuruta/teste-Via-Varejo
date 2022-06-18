import juros from '../util/juros'

export default class CompraService {
  public static testing (): String {
    return 'success'
  }

  public static async comprar (produto: any, condicaoPagamento: any): Promise<any> {
    try {
      const result = await juros(produto, condicaoPagamento)
      return result
    } catch (e) {
      console.error(e)
      return { message: 'Erro' }
    }
  }
}
