import { useState } from "react";
import autenticacao from "../../services/auth";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState <string>("")
  const [senha, setSenha] = useState <string>("")
 const navigate = useNavigate()

  async function fazerLogin(){

  try {
    await autenticacao(email, senha)
    navigate("/dashboard")
    
  } catch (error) {
    console.log(error)
  }
 }
  
  return (
    <main className="login">
      <section className="login__container">
        <h1>Pizza Bar</h1>

        <p>Entre com seu e-mail e senha</p>

        <form className="login__form" onSubmit={(e)=>{
          e.preventDefault()
          fazerLogin()
        }}>
          <div className="login__field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              autoComplete="email"
              onChange={(evento)=>{
                setEmail(evento.target.value)
              }}
            />
          </div>

          <div className="login__field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              value={senha}
              onChange={(evento)=>{
                setSenha(evento.target.value)

              }}
            />
          </div>

          <button type="button"
          onClick={fazerLogin
          }
          >Entrar</button>
        </form>
      </section>
    </main>
  );
}

export default Login;
