import {
  Button,
  Collapse,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import apiCall from "../../../../../api";
import EventosListaDetalle from "./EventosListaDetalle";

export default function EventosItemLista({ evts, token }) {
  const [eventos, setEventos] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const handleDetalle = (evt) => {
    console.log(evt);
  };
  useEffect(() => {
    console.log(evts);
    setEventos(evts);
  }, []);
  return (
    <TableBody>
      {eventos?.map((evt) => {
        return (
          <TableRow>
            <TableCell onClick={() => handleDetalle(evt)}>{evt.tipo}</TableCell>
            <TableCell>{evt.fecha}</TableCell>
            <TableCell>{evt.loc}</TableCell>
            <TableCell>
              <Button color="secondary">Editar</Button>
              <Button variant="contained" color="primary">
                Reportar
              </Button>
            </TableCell>
            {expanded ? (
              <EventosListaDetalle token={token} evtId={evt.id} />
            ) : (
              <br />
            )}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
