import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "../views/Home";
import Login from "../views/Auth/Login";
import Register from "../views/Auth/Register";
import Landing from "../views/Landing";
import FourOFour from "../views/404";
import PilotosProvider from "../context/pilotos/Provider";
import { useState } from "react";

export default function Routes() {
  const [token, setToken] = useState(localStorage.getItem("token"));

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
            {token !== null ? (
              <Home token={token} onLogout={onLogout} />
            ) : (
              <Redirect path="/login" />
            )}
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
        </PilotosProvider>
        <Route>
          <FourOFour />
        </Route>
      </Switch>
    </Router>
  );
}
