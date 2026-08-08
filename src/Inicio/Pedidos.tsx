import { addDoc, collection } from "firebase/firestore";
import { FiArrowLeft } from "react-icons/fi";
import { db } from "../Layout/Services/Firebase";
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
interface ItemSacola {
  produto: Produto;
  quantidade: number;
  observacao:string;
}
interface PedidosProps {
  fecharSacola: () => void;
  sacola: ItemSacola[];
  diminuirQtd: (produto: Produto) => void;
  addASacola: (produto: Produto) => void;
  removerPedido: (produto: Produto) => void;
  limparSacola:()=> void;
 calcularPreco:(item:ItemSacola)=> number;
 alterarObservacao:(produtoId:string , observacao:string)=> void
 popUpPedidoEnviado:()=> void
 popUp: boolean
}
 interface Pedidos{
itens: ItemSacola[]
total:number



 }
function Pedidos({
  fecharSacola,
  sacola,
  diminuirQtd,
  addASacola,
  removerPedido,
  limparSacola,
 calcularPreco,
 alterarObservacao,
 popUpPedidoEnviado,
 popUp
}: PedidosProps) {



const total = sacola.reduce((acumulador, item)=>{
  return acumulador + calcularPreco(item)
}, 0)


async function enviarPedidos() {
    const pedido :Pedidos ={

      itens:sacola,
      total: total
  }
  const pedidosRef = collection(db, "pedidos" )
  const resposta = await addDoc(pedidosRef, pedido)
 
  
  console.log(resposta)
}

 
  return (
    <>
  {popUp&&
   <div className="popup-pedido-enviado">
      <h1>Pedido enviado!</h1>
    </div>

  
  }   
 
      <div className="pedidos-overlay">
        <div className="pedidos">
          <header className="header-pedidos">
            <button className="btn-fechar" onClick={fecharSacola}>
              <FiArrowLeft />
            </button>

            <h1>Sacola</h1>

            <button className="btn-limpar"
            onClick={
              limparSacola
            }
            >Limpar</button>
          </header>

          <section>
           {sacola.length  >=1 && (<h2>Itens adicionados</h2>)}

           
            
         
            {sacola
            
            
            
            
            .map((item) => {
              const subtotal = calcularPreco(item)
              return(
              <div className="itens" key={item.produto.id}>
                <div className="item">
                  <img src="https://placehold.co/100x100" alt="Pizza" />

                  <div className="info">
                    <h3>{item.produto.nome}</h3>

                    <p>{item.produto.descricao}</p>

                    <span className="preco">{subtotal.toLocaleString("pt-Br",{
                  style:"currency",
                  currency:"BRL"
                })}</span>

                    <div className="add-remover">
                      <button
                        onClick={() => {
                          removerPedido(item.produto);
                        }}
                      >
                        🗑️
                      </button>

                      <p className="qtd">{item.quantidade}</p>

                      <button
                        onClick={() => {
                          addASacola(item.produto);
                        }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => {
                          diminuirQtd(item.produto);
                        }}
                      >
                        -
                      </button>
                         <label htmlFor="observacao">Observação</label>
                    <input type="text" 
                    id="observacao"
                    placeholder="Ex: Sem cebola"
                    onChange={(evento)=>{
                       alterarObservacao(item.produto.id, evento.target.value )
                     }}
                    />
                    </div>
                 
                  </div>
                </div>

                <button className="mais-itens"
                onClick={()=>{
                  fecharSacola()
                }}>+ Adicionar itens</button>
              </div>
              
            )})}
            
          
            {sacola.length === 0 && (
              <button className="mais-itens"
              onClick={()=>{
                  fecharSacola()

              }}
              >

              Adicionar itens

              </button>


            ) }

          

           {sacola.length >=1 &&
           ( <div className="resumo-valores">
              <h2>Resumo do pedido</h2>

            

              <div className="valores">
                <p>Total</p>

               
                <p className="resumo-preco">{total.toLocaleString("pt-Br",{
                  style:"currency",
                  currency:"BRL"
                })}</p>
              </div>
            </div>)}
          </section>

          <footer className="footer-pedido">
            <button className="btn-finalizar"
            onClick={()=>{
              enviarPedidos()
              popUpPedidoEnviado()
            }}>Confirmar pedido</button>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Pedidos;
