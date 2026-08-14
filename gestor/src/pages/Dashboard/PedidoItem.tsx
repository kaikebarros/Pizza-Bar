import StatusPedido from "./StatusPedido";
interface Produto {
    id: string;
    nome: string;
    preco: number;
    categoria: string;
    imagem: string;
    descricao: string;
    resumo: string;
  }
  
 


function PedidoItem({pedido}) {
  return (
    <article className="pedido-item">
      <div>
        
        <span>{pedido.mesa}</span>
      </div>

      <div>
        <span>R$ 85,90</span>
        <StatusPedido />
      </div>
    </article>
  );
}

export default PedidoItem;
