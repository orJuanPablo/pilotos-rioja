import {
  Container,
  Table,
  TableCell,
  TableRow,
  Button,
  TableHead,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import apiCall from "../../../../../api";
import PilotosContext from "../../../../../context/pilotos";
import useStyles from "../../../style";
import EventosItemLista from "./EventosItemLista";

export default function EventosLista({ token }) {
  const classes = useStyles();
  const [eventos, setEventos] = useState([]);
  const getEventos = async ({ token }) => {
    try {
      const eventosFetched = await apiCall({
        url: "eventos",
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
          authorization: token,
        },
      });
      const data = await eventosFetched.json();
      console.log(data);
      setEventos(data);
    } catch (error) {
      console.error(error);
      setEventos([]);
    }
  };
  useEffect(() => {
    getEventos(token);
  }, []);

  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Evento</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Localidad</TableCell>
            <TableCell>Buscar</TableCell>
          </TableRow>
        </TableHead>
        <EventosItemLista evts={eventos} token={token} />
      </Table>
    </Container>
  );
}
