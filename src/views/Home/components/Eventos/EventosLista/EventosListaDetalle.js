import { TableCell, TableRow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import apiCall from "../../../../../api";

export default function EventosListaDetalle({ token, evtId }) {
  const [inscriptos, setInscriptos] = useState([]);

  useEffect(() => {
    const getIns = async () => {
      const inscriptos = await apiCall({
        url: `http://192.168.1.14:3000/api/inscripciones/${evtId}`,
        method: "GET",
        headers: { "Content-Type": "Application/Json", authorization: token },
      });
      setInscriptos(inscriptos);
    };
    getIns();
  }, []);
  return (
    <TableRow>
      {inscriptos?.array.forEach((element) => {
        return (
          <TableRow key={element.id}>
            <TableCell>{(element.apellido, element.nombre)}</TableCell>
            <TableCell>{element.dni}</TableCell>
            <TableCell>{element.fecNac}</TableCell>
          </TableRow>
        );
      })}
    </TableRow>
  );
}
