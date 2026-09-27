export interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  imagem: string;
  descricao: string;
  resumo: string;
}

export interface ItemSacola {
  produto: Produto;
  quantidade: number;
  observacao: string;
}