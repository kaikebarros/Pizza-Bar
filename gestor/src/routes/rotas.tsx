import { Route, Routes } from "react-router-dom"
import Dashboard from "../pages/Dashboard/Dashboard"
import Login from "../pages/Login/Login"
function Rotas (){

  return(<>
  <Routes>
    <Route path="/" element={<Login/>}></Route>
    <Route path="/dashboard" element={<Dashboard/>}></Route>

  </Routes>
  
  </>)
}


export default Rotas