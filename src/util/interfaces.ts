export default interface GeneralData {
  produto: ProdutoData
  condicaoPagamento: PagamentoData
}

export interface ProdutoData {
  codigo: number
  nome: string
  valor: number
}

export interface PagamentoData {
  valorEntrada: number
  qtdeParcelas: number
}

export interface AxiosData {
  data: string
  valor: string
}

export interface Juros {
  numeroParcela: number
  valor: number
  taxaJurosAoMes: number
}
