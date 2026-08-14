import "./Dashboard.css";

import GraficoVendas from "./GraficoVendas";
import HeaderDashboard from "./HeaderDashboard";
import PedidosRecentes from "./PedidosRecentes";
import ProdutosMaisVendidos from "./ProdutosMaisVendidos";
import ResumoDashboard from "./ResumoDashboard";

function Dashboard() {
  return (
    <main className="dashboard">
      <HeaderDashboard />
    
      <section className="dashboard__content">
        <ResumoDashboard />

        <GraficoVendas />

        <PedidosRecentes />

        <ProdutosMaisVendidos />
      </section>
    </main>
  );
}

export default Dashboard;
