import {Button, Container, TextField, Card, Grid, Typography} from '@material-ui/core'
import  Swal  from "sweetalert2"
import styles from './style'
import { useHistory } from 'react-router'

import logo from '../../img/LogoCoberturaMedica.png'


export default function Login({ onLogin }) {
    const classes = styles()
    const hist  = useHistory()
    const login = async (evt) => 
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
            return ''
        }else{
            try {
                    const resp = await fetch('http://localhost:3000/api/auth/login',
                    {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({ userName, password})
                    })
                const auth = await resp.json()
                if(auth.token)
                    { 
                        onLogin(auth.token)
                        localStorage.setItem('token', auth.token)
                        hist.push('/home') 
                    }else
                    {
                        Swal.fire(
                            {
                                icon: 'error',
                                title: 'Inválido',
                                text: `El usuario y/o contraseña no es válido.`,
                                confirmButtonColor: '#d63031'
                            }
                        )
                    }
                } catch (error) {
                console.error(error)
            }            
        }
    }
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
                    <TextField className={classes.UserTextField} color= 'secondary' id = 'userName' label = 'Usuario' required />
                    <TextField className={classes.PassTextField} color= 'secondary' id = 'userPass' type ='password' label = 'Contraseña' required />
                    <Grid className={classes.ButtonContainer}>
                        <Button type= "submmit" variant= "contained" color= 'primary' className= {classes.ButtonIniciar} onClick= {(evt) => login(evt)}>Iniciar Sesion</Button>
                    </Grid>
                </Card>
            </form>
        </Container>
    )
}