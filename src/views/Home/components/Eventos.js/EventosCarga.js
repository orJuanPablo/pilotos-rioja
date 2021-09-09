import React from 'react'

export default function EventosCarga() {
    return (
        <form >
        <label htmlFor="evtNombre">Nombre del evento</label>
        <input type= "text" name= "evtNombre" id="evtNombre" />
        <label htmlFor="evtFecha">Fecha de evento</label>
        <input type="text" name="evtFecha" id="evtFecha" />
        <label htmlFor="evtProv">Seleccione la provincia donde transcurre el evento</label>
        <input type="select" name="evtProv" id="evtProv" />
        <label htmlFor="evtLoc">Seleccione la localidad donde transcurre el evento</label>
        <input type="select" name="evtLoc" id="evtLoc" /> 
        <br/><br />
        <input type="submit" value="Cargar" />       
        </form>
    )
}
