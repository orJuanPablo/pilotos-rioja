import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "../views/Home"
import Login from "../views/Login"
import Register from "../views/Register"
import FourOFour from '../views/404';

export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path ='/login'>
                    <Login />
                </Route>
                <Route path ='/register'>
                    <Register />
                </Route>
                <Route>
                    <FourOFour />
                </Route>
            </Switch>
        </Router>
    )
}