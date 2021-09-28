import { Container, Table, TableCell, TableRow, Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import useStyles from "../../../style";

export default function EventosLista({ token }) {
  const classes = useStyles();
  const { getEventos, eventos } = useContext();
  const [eventosLocal, setEventosLocal] = useState([]);

  useEffect(() => {
    getEventos({ token }).then((dataEventos) => {
      setEventosLocal(dataEventos);
    });
  }, []);

  return (
    <Container>
      <Table>
        <TableRow>
          <TableCell>Evento</TableCell>
          <TableCell>Fecha</TableCell>
          <TableCell>Localidad</TableCell>
          <TableCell>
            <Button>Reportar</Button>
          </TableCell>
        </TableRow>
      </Table>
    </Container>
  );
}
