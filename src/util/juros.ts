import axios from 'axios'

export default async function juros (produto: any, condicaoPagamento: any): Promise<any> {
  try {
    const result = await axios.get('http://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/30?formato=json')
    const arrayData = result.data
    const taxa = taxaMensal(arrayData)
    const valores = calcularJuros(taxa, produto, condicaoPagamento)
    return valores
  } catch (e) {
    console.error(e)
  }
}

export function calcularJuros (taxaMensal: number, produto: any, condicaoPagamento: any) {
  const valor = Number(produto.valor)
  const entrada = Number(condicaoPagamento.valorEntrada)
  const parcelas = Number(condicaoPagamento.qtdeParcelas)
  const taxa = taxaMensal
  const valorAParcelar = valor - entrada
  const valorParcelaSemJuros = valorAParcelar / parcelas
  const valorFinal = []

  if (parcelas <= 6) {
    for (let i = 1; i <= parcelas; i++) {
      valorFinal.push({ numeroParcela: i, valor: valorParcelaSemJuros.toFixed(2), taxa: 0 })
    }
  } else {
    const valorParcelaComJuros = valorParcelaSemJuros * taxaMensal
    for (let i = 1; i <= parcelas; i++) {
      valorFinal.push({ numeroParcela: i, valor: valorParcelaComJuros, taxa: taxa })
    }
  }
  return valorFinal
}

export function taxaMensal (arrayData: any): number {
  let taxaMensal = 0
  for (let i = 0; i < arrayData.length; i++) {
    taxaMensal += Number(arrayData[i].valor)
  }
  return Number(taxaMensal.toFixed(2))
}
