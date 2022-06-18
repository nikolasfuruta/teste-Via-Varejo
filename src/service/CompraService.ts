import juros from '../util/juros'

export default class CompraService {
  public static testing (): String {
    return 'success'
  }

  public static async comprar (produto: any, condicaoPagamento: any): Promise<any> {
    try {
      const result = await juros(produto, condicaoPagamento)
      const valorFinal = result.valorFinal
      const taxa = result.taxa
      return [
        {
          numeroParcela: condicaoPagamento.qtdeParcelas,
          valor: valorFinal,
          taxaJurosAoMes: taxa
        }
      ]
    } catch (e) {
      console.error(e)
      return { message: 'Erro' }
    }
  }
}
