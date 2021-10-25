import {
  Button,
  Card,
  Collapse,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useStyles } from "@material-ui/pickers/views/Calendar/Day";
import React, { useEffect, useState } from "react";
import ExportExcel from "react-export-excel";
import EventosListaDetalle from "./EventosListaDetalle";

export default function EventosItemLista({ evts, token }) {
  const classes = useStyles();
  const [eventos, setEventos] = useState([]);
  const [expanded, setExpanded] = useState(0);
  const handleDetalle = (evt) => {
    expanded === 0 || expanded !== evt.id
      ? setExpanded(evt.id)
      : setExpanded(0);
  };

  useEffect(() => {
    setEventos(evts);
  }, [evts]);
  return (
    <TableBody>
      {eventos?.map((evt) => {
        let fechaSplit = evt.fecha.split("-");
        return (
          <>
            <TableRow key={evt.id}>
              <TableCell onClick={() => handleDetalle(evt)}>
                {evt.pista}
              </TableCell>
              <TableCell>
                {fechaSplit[2] + "/" + fechaSplit[1] + "/" + fechaSplit[0]}
              </TableCell>
              <TableCell>{evt.loc}</TableCell>
            </TableRow>
            {expanded == evt.id ? (
              <EventosListaDetalle token={token} evt={evt} />
            ) : (
              <></>
            )}
          </>
        );
      })}
    </TableBody>
  );
}
