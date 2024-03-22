import React from "react";
import { Snackbar } from "react-native-paper";

export function Alerta({ mensagem, error = false, setError, duracao = 1500 }) {
  return (
    <Snackbar
      visible={error}
      onDismiss={() => setError(false)}
      duration={duracao}
      action={{
        label: "OK",
        onPress: () => setError(false),
      }}
    >
      {mensagem}
    </Snackbar>
  );
}
