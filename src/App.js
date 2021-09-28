import "./App.css";
import Routes from "./routes/index";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <Routes />
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
