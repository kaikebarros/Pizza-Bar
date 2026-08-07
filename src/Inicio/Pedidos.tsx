import { FiArrowLeft } from "react-icons/fi";
import "./Pedidos.css";
interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: string;
  imagem: string;
  descricao: string;
  resumo: string;
}
interface PedidosProps {
  fecharSacola: () => void;
  sacola: Produto[];
}

function Pedidos({ fecharSacola, sacola }: PedidosProps) {
  return (
    <>
      <div className="pedidos-overlay">
        <div className="pedidos">
          <header className="header-pedidos">
            <button className="btn-fechar" onClick={fecharSacola}>
              <FiArrowLeft />
            </button>

            <h1>Sacola</h1>

            <button className="btn-limpar">Limpar</button>
          </header>

          <section>
            <h2>Itens adicionados</h2>
            {sacola.map((produto) => (
              <div className="itens" key={produto.id}>
                <div className="item">
                  <img src="https://placehold.co/100x100" alt="Pizza" />

                  <div className="info">
                    <h3>{produto.nome}</h3>

                    <p>{produto.descricao}</p>

                    <span className="preco">{produto.preco}</span>

                    <div className="add-remover">
                      <button>🗑️</button>

                      <p className="qtd">1</p>

                      <button>+</button>
                      <button>-</button>
                    </div>
                  </div>
                </div>

                <button className="mais-itens">+ Adicionar mais itens</button>
              </div>
            ))}

            <div className="resumo-valores">
              <h2>Resumo do pedido</h2>

              <div>
                <p>Subtotal</p>
                <p className="resumo-preco">R$ 100,00</p>
              </div>

              <div>
                <p>Adicionais</p>
                <p className="resumo-preco">R$ 50,00</p>
              </div>

              <div className="valores">
                <p>Total</p>
                <p className="resumo-preco">R$ 150,00</p>
              </div>
            </div>
          </section>

          <footer className="footer-pedido">
            <button className="btn-finalizar">Confirmar pedido</button>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Pedidos;
