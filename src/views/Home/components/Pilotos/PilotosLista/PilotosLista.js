import { Button, Container, List, ListItem, ListItemText, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import PilotosItemLista from './PilotosItemLista'

export default function PilotosLista({token}) {
    const [dataPilotos, setDataPilotos] = useState([])
    useEffect(() => {
        const req = async () =>
        {
            const response = await fetch('http://localhost:3000/api/pilotos',
                {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json', 'authorization': token} 
                })
            const data = await response.json()
            setDataPilotos(data)
        }
        req().catch(null)
        console.log(dataPilotos)
    }, [])
    
    return (
        <List style = {{marginTop: '20vh'}}>
            <PilotosItemLista pilotos = { dataPilotos } />
            <ListItem>
                <ListItemText>
                    <Button id ='createPilotoBtn' contained color='primary'>
                        Agregar nuevo Piloto
                    </Button>
                </ListItemText>
            </ListItem>
        </List>
    )
}
