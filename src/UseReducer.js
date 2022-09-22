import { useReducer, useEffect } from "react";
import { Loading } from "./loading";

const initialState = {
  value: "",
  error: false,
  loading: false,
  delete: false,
  confirmed: false,
};

const reducerObject = (state, payload) => ({
  [actionTypes.ERROR]: {
    ...state,
    value: "",
    error: true,
    loading: false,
  },
  [actionTypes.CONFIRM]: {
    ...state,
    loading: false,
    confirmed: true,
  },
  [actionTypes.RESET]: { ...state, value: "", delete: false, confirmed: false },
  [actionTypes.DELETE]: {
    ...state,
    delete: true,
  },
  [actionTypes.CHECK]: {
    ...state,
    error: false,
    loading: true,
  },
  [actionTypes.WRITE]: {
    ...state,
    value: payload,
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || initialState;
};

const SECURITY_CODE = "para";

export function UseReducer({ name }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function onError() {
    dispatch({ type: actionTypes.ERROR });
  }

  function onConfirm() {
    dispatch({ type: actionTypes.CONFIRM });
  }

  function onReset() {
    dispatch({ type: actionTypes.RESET });
  }

  function onDelete() {
    dispatch({ type: actionTypes.DELETE });
  }

  function onCheck() {
    dispatch({ type: actionTypes.CHECK });
  }

  function onWrite(event) {
    dispatch({
      type: actionTypes.WRITE,
      payload: event.target.value,
    });
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
        {!state.loading && (
          <>
            <input
              placeholder="Código de seguridad"
              value={state.value}
              onChange={onWrite}
            ></input>
            <button onClick={onCheck}>Comprobar</button>
          </>
        )}
      </div>
    );
  } else if (!!state.confirmed && !state.delete) {
    return (
      <div>
        <p>Estado confirmación</p>
        <button onClick={onDelete}>Sí, eliminar</button>
        <button onClick={onReset}>No, volver</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Estado eliminado</p>
        <button onClick={onReset}>Resetear Use State</button>
      </div>
    );
  }
}

const actionTypes = {
  ERROR: "ERROR",
  CONFIRM: "CONFIRM",
  RESET: "RESET",
  DELETE: "DELETE",
  CHECK: "CHECK",
  WRITE: "WRITE",
};
