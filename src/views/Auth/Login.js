import {React} from 'react'
import {Button, Container, TextField, Card, Grid, Typography} from '@material-ui/core'
import  Swal  from "sweetalert2";
import styles from './style'

import logo from '../../img/LogoCoberturaMedica.png'

export default function Login() {
    const classes = styles()

    return (
        <Container className= {classes.Container}>
            <form id = "loginForm">
                <Card className= {classes.CardContainer}>
                    <Grid>
                        <img alt = 'Logo Cobertura Médica' src = {logo}  width= '500px' height = '150px'/>
                    </Grid>
                    <Grid className= {classes.TitleGridContainer}>
                        <Typography className={classes.Title}>Iniciar Sesión</Typography>
                    </Grid>
                    <TextField className={classes.UserTextField} color= 'seconday' id = 'userName' label = 'Usuario' required />
                    <TextField className={classes.PassTextField} color= 'seconday' id = 'userPass' type ='password' label = 'Contraseña' required />
                    <Grid className={classes.ButtonContainer}>
                        <Button type= "submmit" variant= "contained" color= 'primary' className= {classes.ButtonIniciar} onClick= {(evt) => login(evt)}>Iniciar Sesion</Button>
                    </Grid>
                </Card>
            </form>
        </Container>
    )
}

const login = (evt) => 
{
    evt.preventDefault()
    const userName = document.getElementById('userName').value
    const password = document.getElementById('userPass').value
    if(userName === '' || password === '')
    {
        Swal.fire(
            {
                icon: 'error',
                title: 'Completar Campos',
                text: `No ha llenado todos los campos requeridos.`,
                confirmButtonColor: '#d63031'
            }
        )
    }else{
        fetch('http://localhost:3000/api/auth/login',
              {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({ userName, password})
              })
          .then(x => x.json())
          .then(respuesta => {
              if(!respuesta.token)
              { 
                Swal.fire(
                    {
                        icon: 'error',
                        title: 'Inválido',
                        text: `El usuario y/o contraseña no es válido.`,
                        confirmButtonColor: '#d63031'
                    }
                )
              }else
              {
                localStorage.setItem('token', respuesta.token)
              }
              
            })
    }
}