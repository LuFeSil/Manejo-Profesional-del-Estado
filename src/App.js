import "./App.css";
import { UseState } from "./UseState.js";
import { UseReducer } from "./UseReducer";

function App() {
  return (
    <div className="App">
      <UseState name="Use State" />
      <UseReducer name="Use Reducer" />
    </div>
  );
}

export default App;
