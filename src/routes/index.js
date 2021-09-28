import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import FourOFour from "../views/404";
import PilotosProvider from "../context/pilotos/Provider";
import { useHistory, useState } from "react";

export default function Routes() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isLogged = (token === null)
  /*------Component did Mount ask for Token ------
    useEffect(() => 
    {
        if(localStorage.getItem('token')) 
        {
            setToken(localStorage.getItem('token'));
        }

    }, [])//El problema es que el router se ejecuta antes de que el componente esté totalmente montado
    /*------ End Component did Mount ask for Token ------*/
  const onLogin = (tkn) => {
    setToken(tkn);
  };
  const onLogout = () => {
    setToken(null);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login onLogin={onLogin} />
        </Route>
        <Route path="/reg">
          <Register />
        </Route>
        <PilotosProvider>
          <Route path="/home">
            <Home token={token} onLogout={onLogout} />
          </Route>
        </PilotosProvider>
        <Route>
          <FourOFour />
        </Route>
      </Switch>
    </Router>
  );
}
