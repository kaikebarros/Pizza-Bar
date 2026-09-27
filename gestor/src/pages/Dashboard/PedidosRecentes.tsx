import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import PedidoItem from "./PedidoItem";

interface Pedido {
  id: string;
  mesa: number;
}

function PedidosRecentes() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  async function buscarPedidos() {
    const pedidosRef = collection(db, "pedidos");
    const resposta = await getDocs(pedidosRef);

    const lista: Pedido[] = resposta.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Pedido[];

    setPedidos(lista);
  }

  useEffect(() => {
    buscarPedidos();
  }, []);

  return (
    <section className="pedidos-recentes">
      <div>
        <h2>Pedidos recentes</h2>
        <button>Ver todos</button>
      </div>

      <div>
        {pedidos.map((pedido) => (
          <PedidoItem key={pedido.id} pedido={pedido} />
        ))}
      </div>
    </section>
  );
}

export default PedidosRecentes;
