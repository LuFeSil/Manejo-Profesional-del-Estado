import React, { useEffect, useState } from "react";
import { Loading } from "./loading";

const SECURITY_CODE = "para";

export function UseState({ name }) {
  const [state, setState] = useState({
    value: "",
    error: false,
    loading: false,
    delete: false,
    confirmed: false,
  });

  function onError() {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  }

  function onConfirm() {
    setState({
      ...state,
      loading: false,
      confirmed: true,
    });
  }

  function onReset() {
    setState({ ...state, value: "", delete: false, confirmed: false });
  }

  function onDelete() {
    setState({ ...state, delete: true });
  }

  function onCheck() {
    return setState({ ...state, error: false, loading: true });
  }

  function onWrite(event) {
    setState({ ...state, value: event.target.value });
  }

  useEffect(() => {
    if (!!state.loading) {
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
      }, 2000);
    }
  }, [state.loading]);

  if (!state.delete && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor escribe el código de seguridad.</p>
        {state.error && <p>Error: el código es incorrecto</p>}
        {state.loading && <Loading />}
        <input
          placeholder="Código de seguridad"
          value={state.value}
          onChange={(event) => onWrite(event)}
        ></input>
        <button onClick={() => onCheck()}>Comprobar</button>
      </div>
    );
  } else if (!!state.confirmed && !state.delete) {
    return (
      <div>
        <p>Estado confirmación</p>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          Sí, eliminar
        </button>
        <button
          onClick={() => {
            onReset();
          }}
        >
          No, volver
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Estado eliminado</p>
        <button
          onClick={() => {
            onReset();
          }}
        >
          Resetear Use State
        </button>
      </div>
    );
  }
}
