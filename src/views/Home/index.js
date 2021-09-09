import React, { useContext, useEffect } from 'react'
import PilotosContext from '../../context/pilotos'
import NavBar from './components/NavBar'



export default function Home() {
    const {showAlert} = useContext(PilotosContext)
    return (
        <div>
            <NavBar/>
            
        </div>
    )
}
