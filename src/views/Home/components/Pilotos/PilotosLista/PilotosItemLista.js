import {
  Button,
  TableCell,
  TableRow,
} from "@material-ui/core";
import useStyles from "../../../style";

export default function EventosItemLista({
  pilotos,
  onInsPiloto,
  onEditPiloto,
}) {
  const handleOnAsegurar = ({ value }) => {
    const piloto = value;
    onInsPiloto(piloto.id);
  };
  const handleOnEditar = ({ value }) => {
    const piloto = value;
    onEditPiloto(piloto);
  };
  return (
    <>
      {pilotos?.map((value) => {
        let dateParts = value.fecNac.split("-");
        return (
          <TableRow key={value.id}>
            <TableCell>{value.apellido + ", " + value.nombre}</TableCell>
            <TableCell>{value.dni}</TableCell>
            <TableCell>
              {dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0]}
            </TableCell>
            <TableCell>{value.tel}</TableCell>
            <TableCell>{value.email}</TableCell>
            <TableCell>
              <Button
                onClick={() => handleOnEditar({ value })}
                color="secondary"
              >
                Editar
              </Button>
              <br />
              <Button
                onClick={() => handleOnAsegurar({ value })}
                variant="contained"
                color="secondary"
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
