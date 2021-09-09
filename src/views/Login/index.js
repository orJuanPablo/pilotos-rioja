import React from 'react'

export default function Login() {
    return (
        <div>
            <form id = "loginForm">
                <input type="text" name="userName" id="userName" /><br/>
                <input type="password" name="pass" id="pass" /><br/>
                <input type="submit" id="Aceptar" title="Log in" onClick = {() => Login()}/>
            </form>
        </div>
    )
}

const login = (evt) => 
{
    evt.preventDefault()
}