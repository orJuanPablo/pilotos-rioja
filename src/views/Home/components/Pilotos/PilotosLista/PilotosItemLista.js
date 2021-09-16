import { Button, ListItem, Typography } from '@material-ui/core'
import useStyles from '../../../style'

export default function EventosItemLista( {pilotos} ) {
    const classes = useStyles()
    console.log(pilotos)
    return (
        <div>
            {pilotos?.map((value) =>
            {
                return(
                    <ListItem className = {classes.itemPilotos} key = {value._id}>
                        <Typography>
                            {value.name + ' ' + value.lastName}
                        </Typography>
                        <Typography>
                            DNI:   {value.dni}
                        </Typography>
                        <Typography>
                            Teléfono:  {value.telefono}
                        </Typography>
                        <Button key = {value._id} color='secondary' variant = 'contained'>Asegurar</Button>
                    </ListItem>
                )
            })}
        </div>
    )
}
