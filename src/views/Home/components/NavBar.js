import React from 'react'


export default function navBar() {
    return (
        <div class = "NavBar">
            <ul>
                <li onClick = {() => EventosLista()}>Eventos</li>
                <li on onClick= {() => PilotosLista()}>Pilotos</li>
                <li onClick = {() => AccidentesLista()}>Accidentes</li>
                <li onClick = {() => ProvinciasLista()}>Provincias</li>
                <li onClick = {() => LocalidadesLista()}>Localidades </li>
            </ul>
        </div>
    )
}

const EventosLista = () =>
{
    alert('Lista de Eventos Trabajando...')
} 
const PilotosLista = () =>
{
    alert('Lista de Pilotos Trabajando...')
}
const AccidentesLista = () =>
{
    alert('Lista de Accidentes Trabajando...')
}
const ProvinciasLista = () =>
{
    alert('Lista de Provincias Trabajando...')
}
const LocalidadesLista = () =>
{
    alert('Lista de Localidades Trabajando...')
}