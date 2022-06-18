import axios from 'axios'

export default async function juros (produto: any, condicaoPagamento: any): Promise<any> {
  await axios.get('http://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json')
    .then(result => {
      return calcularJuros(result, produto, condicaoPagamento)
    })
    .catch(e => console.error(e))
}

export function calcularJuros (result: any, produto: any, condicaoPagamento: any) {
  const valor = Number(produto.valor)
  const entrada = Number(condicaoPagamento.valorEntrada)
  const parcelas = Number(condicaoPagamento.qtdeParcelas)
  const taxa = Number(result.data[0].valor)
  const valorAParcelar = valor - entrada
  const valorParcelaSemJuros = valorAParcelar / parcelas

  if (parcelas <= 6) {
    const valorFinal = valorParcelaSemJuros
    return { valorFinal, taxa }
  } else {
    const valorFinal = valorParcelaSemJuros * taxa
    return { valorFinal, taxa }
  }
}
