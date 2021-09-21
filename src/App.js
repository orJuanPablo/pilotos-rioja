import "./App.css";
import Routes from "./routes/index";
import PilotosProvider from "./context/pilotos/Provider";

function App() {
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
