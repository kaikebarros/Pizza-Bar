// [ ] Btn chamar garçon
// [x] Filtro de pesquisa input
// [x] Filtro de pesquisa por categoria
// [ ] Card desmonstração com carrocel
// [x] Btn Categoria
// [x] Card com produtos
// [ ] Adicionar produtos no carrinho
// [ ] Enviar pedido do carrinho para o sistema gestor
// [x] Configurar firebase
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FiBell } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import logo from "../assets/Pizza Bar.png";
import Rotas from "../routes/routes";
import "./Layout.css";
import { db } from "./Services/Firebase";
function Layout() {
  const [searchParams] = useSearchParams();

  const valorMesa = searchParams.get("mesa");
  if (valorMesa === null) {
    console.log("QR code inválido");
    return;
  }
  console.log(valorMesa);

  async function chamarGarcom() {
    const notificacoes = collection(db, "notificacoes");
    const resposta = await addDoc(notificacoes, {
      mesa: valorMesa,
      criadoEm: serverTimestamp(),
      tipo: "chamar_garcom",
      status: "pendente",
    });

    console.log(resposta);
  }

  return (
    <>
      <div className="layout">
        <div className="header-layout">
          <img src={logo} alt="pizza bar" />
          <button
            className="notificacao"
            onClick={() => {
              chamarGarcom();
            }}
          >
            {" "}
            <FiBell />
            <span>Chamar garçom</span>
          </button>
        </div>

        <Rotas />
      </div>
    </>
  );
}

export default Layout;
