import "./Layout.css";
import { FiBell, FiShoppingCart } from "react-icons/fi";
import logo from "../assets/Pizza Bar.png";
import Inicio from "../Inicio/Inicio";
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

        <button className="carrinho">
          <FiShoppingCart />
        </button>
      </div>
    </>
  );
}

export default Layout;
