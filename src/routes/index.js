import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "../views/Home"
import Login from "../views/Auth/Login"
import Register from "../views/Auth/Register"
import FourOFour from '../views/404';

const isAuth = () =>
{
    
}

export default function Routes(){
    return(
        <Router>
            <Switch>
                <Route path = '/login'>
                    <Login />
                </Route>
                <Route path = '/reg'>
                    <Register />
                </Route>                
                <Route path = '/Home'>
                    <Home/>
                </Route>
                <Route>
                    <FourOFour />
                </Route>
            </Switch>
        </Router>
    )
}