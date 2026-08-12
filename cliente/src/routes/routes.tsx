import { Route, Routes } from "react-router-dom";
import Inicio from "../Inicio/Inicio";

function Rotas() {
  return (
    
      <Routes>
        <Route path="/" element={<Inicio />}></Route>
      </Routes>
    
  );
}

export default Rotas;
