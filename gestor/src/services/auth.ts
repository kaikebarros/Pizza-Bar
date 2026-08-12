import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
async function autenticacao(email: string, senha: string) {
  try {
    const resposta = await signInWithEmailAndPassword(auth, email, senha);
    return resposta;
  } catch (error) {
    throw(error)
  }
}

export default autenticacao;
