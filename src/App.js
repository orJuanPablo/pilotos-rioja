import logo from './logo.svg';
import './App.css';
import Routes from'./routes/index'
import PilotosProvider from './context/pilotos/Provider'

function App() {
  return (
    <div className="App">
      <PilotosProvider>
        <Routes/>
      </PilotosProvider>
    </div>
  );
}

export default App;
