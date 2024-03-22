import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import estilos from "./estilos";

import { logar } from "../../servicos/requisicoesFirebase";
import { Alerta } from "../../componentes/Alerta";
import { auth } from "../../config/firebase";
import animacaoCarregando from "../../../assets/animacaoCarregando.gif";
import { alteraDados } from '../../utils/comum';

export default function Login({ navigation }) {
  // const [email, setEmail] = useState("");
  // const [senha, setSenha] = useState("");

  const [dados, setDados] = useState({
    email: "",
    senha: "",
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
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        navigation.replace("Principal");
      }
      setCarregando(false);
    });
    return () => estadoUsuario();
  }, []);

  async function realizarLogin() {
    if (dados.email == "") {
      setMensagemError("O email é obrigatório");
      setStatusError("email");
    } else if (dados.senha == "") {
      setMensagemError("A senha é obrigatória");
      setStatusError("senha");
    } else {
      const resultado = await logar(dados.email, dados.senha);
      if (resultado == "erro") {
        setDuracaoMensagem(1500);
        setStatusError("firebase");
        setMensagemError("Email ou senha não conferem");
      } else if (resultado == "sucesso") {
        // setDuracaoMensagem(3000);
        // navigation.navigate("Principal");

        // Apaga as telas anteriores da pilha e reinicia a aplicação
        navigation.replace("Principal");
      }
      console.log(resultado);
    }
  }

  if (carregando) {
    return (
      <View style={estilos.containerAnimacao}>
        <Image source={animacaoCarregando} style={estilos.imagem} />
      </View>
    );
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto
        label="E-mail"
        // value={email}
        value={dados.email}
        // onChangeText={(texto) => setEmail(texto)}
        onChangeText={(valor) => alteraDados('email', valor, dados, setDados)}
        error={statusError == "email"}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        // value={senha}
        value={dados.senha}
        // onChangeText={(texto) => setSenha(texto)}
        onChangeText={(valor) => alteraDados('senha', valor, dados, setDados)}
        secureTextEntry
        error={statusError == "senha"}
        messageError={mensagemError}
      />

      <Alerta
        mensagem={mensagemError}
        error={statusError == "firebase"}
        setError={setStatusError}
        duracao={duracaoMensagem}
      />

      {/* <Botao onPress={() => navigation.navigate("Principal")}>LOGAR</Botao> */}
      <Botao onPress={() => realizarLogin()}>LOGAR</Botao>

      <Botao
        onPress={() => {
          navigation.navigate("Cadastro");
        }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
}
