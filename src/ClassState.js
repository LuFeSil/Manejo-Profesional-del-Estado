import React from "react";
import { Loading } from "./loading";

const SECURITY_CODE = "para";

export class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: false,
      loading: false,
    };
  }

  componentDidUpdate() {
    if (!!this.state.loading) {
      !!this.state.error && this.setState({ error: false });
      setTimeout(() => {
        if (SECURITY_CODE !== this.state.value) {
          this.setState({ error: true });
        }
        this.setState({ loading: false });
      }, 2000);
    }
  }

  render() {
    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor escribe el código de seguridad.</p>
        {this.state.error && <p>Error: el código es incorrecto</p>}
        {this.state.loading && <Loading />}
        <input
          placeholder="Código de seguridad"
          value={this.state.value}
          onChange={(event) => this.setState({ value: event.target.value })}
        ></input>
        <button onClick={() => this.setState({ loading: true })}>
          Comprobar
        </button>
      </div>
    );
  }
}
