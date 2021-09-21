import {
  Button,
  ListItem,
  Typography,
  Grid,
  ListItemText,
} from "@material-ui/core";
import useStyles from "../../../style";

export default function EventosItemLista({ pilotos }) {
  console.log(pilotos)
  const classes = useStyles();
  const handleOnAsegurar = (evt) => {
    alert("Asegurar "+ evt.target)
    console.log(evt);
  };
  const handleOnEditar = () => {
    alert("Editar");
  };
  return (
    <div>
      {pilotos?.map((value) => {
        let date = new Date(value.pil_fecNac);
        return (
          <ListItem className={classes.itemPilotos} key={"li" + value.pil_id}>
            <Grid onClick = {()=>alert('datos pilotos')}>
              <ListItemText
                className={classes.nombreLIT}
                primary={value.pil_apellido +', '+ value.pil_nombre}
              ></ListItemText>
            </Grid>
            <Grid>
              <ListItemText
                className={classes.smallLIT}
                secondary={"DNI " + value.pil_dni}
              />
              <ListItemText
                className={classes.smallLIT}
                secondary={
                  "Fecha de Nacimiento" +
                  date.getDate() +
                  "/" +
                  date.getMonth() +
                  "/" +
                  date.getFullYear()
                }
              />
              <ListItemText
                className={classes.smallLIT}
                secondary={"Teléfono " + value.pil_tel}
              />
            </Grid>
            <Grid className={classes.btnGrid}>
              <Button
                key={"ed" + value.pil_id}
                onClick={handleOnEditar}
                color="secondary"
              >
                Editar
              </Button>
              <Button
                value={"as" + value.pil_id}
                onClick={(evt)=>handleOnAsegurar(evt)}
                color="primary"
                variant="contained"
              >
                Asegurar
              </Button>
            </Grid>
          </ListItem>
        );
      })}
      <ListItem>
        <Button id="createPilotoBtn" variant="contained" color="primary">
          Agregar nuevo Piloto
        </Button>
      </ListItem>
    </div>
  );
}
