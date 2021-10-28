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
    <PilotosProvider>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login onLogin={onLogin} />
          </Route>
          <Route exact path="/reg">
            <Register />
          </Route>
          <Route exact path="/home">
            {token !== null ? (
              <Home token={token} onLogout={onLogout} />
            ) : (
              <Redirect exact path="/login" />
            )}
          </Route>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route>
            <FourOFour />
          </Route>
        </Switch>
      </Router>
    </PilotosProvider>
  );
}
