import React from 'react'


export default function navBar() {
    return (
        <div class = "NavBar">
            <ul>
                <li onClick = {() => cargarEventosView()}>Eventos</li>
                <li on onClick= {() => cargarPilotosView()}>Pilotos</li>
                <li onClick = {() => cargarAccidentesView()}>Accidentes</li>
                <li onClick = {() => cargarLocalidadesView()}>Localidades </li>
                <li onClick = {() => cargarProvinciasView()}>Provincias</li>
            </ul>
        </div>
    )
}

const cargarEventosView = () =>
{

} 