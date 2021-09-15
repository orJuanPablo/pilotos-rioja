import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import Home from "../views/Home"
import Login from "../views/Auth/Login"
import Register from "../views/Auth/Register"
import FourOFour from '../views/404';
import { useEffect, useState } from "react";

export default function Routes(){
    const [token, setToken] = useState(localStorage.getItem('token'))

    /*------Component did Mount ask for Token ------
    useEffect(() => 
    {
        if(localStorage.getItem('token')) 
        {
            setToken(localStorage.getItem('token'));
        }

    }, [])El problema es que el router se ejecuta antes de que el componente esté totalmente montado
    /*------ End Component did Mount ask for Token ------*/
    /*------ Si el token se actualiza redirije a /home ------*/
    useEffect(() => 
    {
        
        if(token!=='') {}
    }, [token])
    /*------ Si el token se actualiza redirije a /home ------*/    

    const onLogin = (tkn) =>
    {
        setToken(tkn)
    }
    
    return(
        <Router>
            <Switch>
                <Route path = '/login'>
                    <Login onLogin = { onLogin } />
                </Route>
                <Route path = '/reg'>
                    <Register />
                </Route>                
                <Route path = '/Home'>
                    <Home token = {token}/>
                </Route>
                <Route path = '/'>
                    {token!==null ? <Redirect to = '/home'/> : <Redirect to = '/Login' />}
                </Route>
                <Route>
                    <FourOFour/>
                </Route>
            </Switch>
        </Router>
    )
}