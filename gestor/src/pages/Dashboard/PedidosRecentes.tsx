import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import PedidoItem from "./PedidoItem";

function PedidosRecentes() {
  const [pedidos, setPedidos] = useState([]);
  async function buscarPedios() {
    const pedidosRef = collection(db, "pedidos");
    const resposta = await getDocs(pedidosRef);

    const lista = resposta.docs.map((doc) => ({
      id: doc.id,

      ...doc.data(),
    }));

    setPedidos(lista);
  }

  useEffect(()=>{
    buscarPedios()
  },[]);
  return (
    <section className="pedidos-recentes">
      <div>
        <h2>Pedidos recentes</h2>
        <button>Ver todos</button>
      </div>

      <div>
        {pedidos.map((pedido) => (
          <PedidoItem pedido={pedido} />
        ))}
      </div>
    </section>
  );
}

export default PedidosRecentes;
