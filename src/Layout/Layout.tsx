// [ ] Btn chamar garçon
// [x] Filtro de pesquisa input
// [x] Filtro de pesquisa por categoria
// [ ] Card desmonstração com carrocel
// [x] Btn Categoria
// [x] Card com produtos
// [ ] Adicionar produtos no carrinho
// [ ] Enviar pedido do carrinho para o sistema gestor
// [x] Configurar firebase
import { FiBell, FiShoppingCart } from "react-icons/fi";
import logo from "../assets/Pizza Bar.png";
import Inicio from "../Inicio/Inicio";
import "./Layout.css";
function Layout() {
  
  return (
    <>
      <div className="layout">
        <div className="header-layout">
          <img src={logo} alt="pizza bar" />
          <button className="notificacao">
            <FiBell />
          </button>
        </div>

        <Inicio />

      </div>
    </>
  );
}

export default Layout;
