import CardResumo, { CardResumoMesa } from "./CardResumo";

function ResumoDashboard() {
  return (
    <section className="resumo-dashboard">
      <CardResumo />
      <CardResumoMesa />
      <CardResumo />
      <CardResumo />
    </section>
  );
}

export default ResumoDashboard;
