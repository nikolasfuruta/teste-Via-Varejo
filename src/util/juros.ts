import axios, { AxiosResponse } from 'axios'
import { AxiosData, Juros, PagamentoData, ProdutoData } from './interfaces'

export default async function juros (produto: ProdutoData, condicaoPagamento: PagamentoData): Promise<Juros[] | Error> {
  try {
    const result: AxiosResponse = await axios.get('http://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/30?formato=json')
    const arrayData: AxiosData[] = result.data
    const taxa: number = taxaMensal(arrayData)
    const valores: Juros[] = calcularJuros(taxa, produto, condicaoPagamento)
    return valores
  } catch (e) {
    throw new Error('AxiosError')
  }
}

export function calcularJuros (taxaMensal: number, produto: ProdutoData, condicaoPagamento: PagamentoData): Juros[] {
  const valor = Number(produto.valor)
  const entrada = Number(condicaoPagamento.valorEntrada)
  const parcelas = Number(condicaoPagamento.qtdeParcelas)
  const taxa = taxaMensal
  const valorAParcelar = valor - entrada
  const valorParcelaSemJuros = valorAParcelar / parcelas
  const valorFinal: Juros[] = []

  if (parcelas <= 6) {
    for (let i = 1; i <= parcelas; i++) {
      valorFinal.push({ numeroParcela: i, valor: Number(valorParcelaSemJuros.toFixed(2)), taxaJurosAoMes: 0 })
    }
  } else {
    const valorParcelaComJuros = valorParcelaSemJuros * taxaMensal
    for (let i = 1; i <= parcelas; i++) {
      valorFinal.push({ numeroParcela: i, valor: valorParcelaComJuros, taxaJurosAoMes: taxa })
    }
  }
  return valorFinal
}

export function taxaMensal (arrayData: AxiosData[]): number {
  let taxaMensal = 0
  for (let i = 0; i < arrayData.length; i++) {
    taxaMensal += Number(arrayData[i].valor)
  }
  return Number(taxaMensal.toFixed(2))
}
