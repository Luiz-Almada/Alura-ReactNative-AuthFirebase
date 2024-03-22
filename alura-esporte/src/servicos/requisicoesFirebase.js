// AuthErrorCodes é um Enum
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  AuthErrorCodes,
 } from "firebase/auth";
import { auth } from "../config/firebase";

function errosFirebase(erro) {
  let mensagem = "";
  switch (erro.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      mensagem = "Esse email já está em uso";
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      mensagem = "Email inválido";
      break;
    case AuthErrorCodes.WEAK_PASSWORD:
      mensagem = "A senha precisa de no mínimo 6 caracteres";
      break;
    default:
      mensagem = "Erro desconhecido";
      break;
  }

  return mensagem;
}

export async function cadastrar(email, senha) {
  const resultado = await createUserWithEmailAndPassword(auth, email, senha)
    .then((dadosDoUsuario) => {
      // console.log(dadosDoUsuario);
      return "sucesso"
    })
    .catch((error) => {
      // console.log(error);
      return errosFirebase(error);
    });

    return resultado;
}

export async function logar(email, senha) {
  const resultado = await signInWithEmailAndPassword(auth, email, senha)
    .then((dadosDoUsuario) => {
      console.log(dadosDoUsuario);
      return "sucesso"
    })
    .catch((error) => {
      console.log(error);
      // return errosFirebase(error);
      return "erro"
    });

    return resultado;
}