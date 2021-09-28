import {
  Button,
  ListItem,
  Typography,
  Grid,
  ListItemText,
  TableCell,
  TableRow,
} from "@material-ui/core";
import useStyles from "../../../style";

export default function EventosItemLista(
  { pilotos },
  { insPilotos, editPilotos }
) {
  // const classes = useStyles();
  const handleOnAsegurar = (evt, key) => {
    console.log(key);
  };
  const handleOnEditar = (evt) => {
    //alert("Editar");
  };
  return (
    <>
      {pilotos?.map((value) => {
        let date = new Date(value.pil_fecNac);
        return (
          <TableRow key={value.pil_id}>
            <TableCell>
              {value.pil_apellido + ", " + value.pil_nombre}
            </TableCell>
            <TableCell>{value.pil_dni}</TableCell>
            <TableCell>
              {date.getDate() +
                "/" +
                date.getMonth() +
                "/" +
                date.getFullYear()}
            </TableCell>
            <TableCell>{value.pil_tel}</TableCell>
            <TableCell>{value.pil_email}</TableCell>
            <TableCell>
              <Button onClick={(evt) => handleOnEditar(evt)} color="secondary">
                Editar
              </Button>
              <br />
              <Button
                onClick={(evt) => handleOnAsegurar(evt)}
                variant="contained"
                color="secondary"
                key={value.pil_id}
              >
                Asegurar
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
