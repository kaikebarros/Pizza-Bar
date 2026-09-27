import StatusPedido from "./StatusPedido";

interface Pedido {
  mesa: number;
  // adicione aqui outros campos que seu pedido possui
}

interface PedidoItemProps {
  pedido: Pedido;
}

function PedidoItem({ pedido }: PedidoItemProps) {
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
