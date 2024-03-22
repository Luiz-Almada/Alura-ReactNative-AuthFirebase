import React, { useState } from "react";
import { Alert, View } from "react-native";

import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import estilos from "./estilos";
import { cadastrar } from "../../servicos/requisicoesFirebase";
import { Alerta } from "../../componentes/Alerta";
import { alteraDados } from '../../utils/comum';

export default function Cadastro({ navigation }) {
  // const [email, setEmail] = useState("");
  // const [senha, setSenha] = useState("");
  // const [confirmaSenha, setConfirmaSenha] = useState("");

  const [dados, setDados] = useState({
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  // const alteraDados = (variavel, valor) => {
  //   setDados({
  //     ...dados,
  //     [variavel]: valor,
  //   });
  // };

  const [statusError, setStatusError] = useState("");
  const [mensagemError, setMensagemError] = useState("");
  const [duracaoMensagem, setDuracaoMensagem] = useState(1500);

  async function realizarCadastro() {
    if (dados.email == "") {
      setMensagemError("Preencha com seu email");
      setStatusError("email");
    } else if (dados.senha == "") {
      setMensagemError("Digite sua senha");
      setStatusError("senha");
    } else if (dados.confirmaSenha == "") {
      setMensagemError("Confirme sua senha");
      setStatusError("confirmaSenha");
    } else if (dados.confirmaSenha != dados.senha) {
      setMensagemError("As senhas não conferem");
      setStatusError("confirmaSenha");
    } else {
      const resultado = await cadastrar(dados.email, dados.senha);
      if (resultado == "sucesso") {
        // Alert.alert("Usuário cadastrado com sucesso!");
        setMensagemError("Usuário criado com sucesso!");
        // setDuracaoMensagem(3000);
        // setEmail("");
        // setSenha("");
        // setConfirmaSenha("");
      } else {
        // Alert.alert(resultado);
        // setDuracaoMensagem(1500);
        setMensagemError(resultado);
      }

      setStatusError("firebase");
      // setStatusError("");
      // setMensagemError("");
    }
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto
        label="E-mail"
        value={dados.email}
        // onChangeText={(texto) => setEmail(texto)}
        onChangeText={(valor) => alteraDados('email', valor, dados, setDados)}
        error={statusError == "email"}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={dados.senha}
        // onChangeText={(texto) => setSenha(texto)}
        onChangeText={(valor) => alteraDados('senha', valor, dados, setDados)}
        secureTextEntry
        error={statusError == "senha"}
        messageError={mensagemError}
      />

      <EntradaTexto
        label="Confirmar Senha"
        value={dados.confirmaSenha}
        // onChangeText={(texto) => setConfirmaSenha(texto)}
        onChangeText={(valor) => alteraDados('confirmaSenha', valor, dados, setDados)}
        secureTextEntry
        error={statusError == "confirmaSenha"}
        messageError={mensagemError}
      />

      <Alerta
        mensagem={mensagemError}
        error={statusError == "firebase"}
        setError={setStatusError}
        duracao={duracaoMensagem}
      />
      <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
    </View>
  );
}
