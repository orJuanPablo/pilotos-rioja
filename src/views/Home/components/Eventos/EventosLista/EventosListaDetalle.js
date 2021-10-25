import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ExportExcel from "react-export-excel";
import apiCall from "../../../../../api";

export default function EventosListaDetalle({ token, evt }) {
  const [inscriptos, setInscriptos] = useState([]);

  const evento = evt;
  let fechaSplit = evento.fecha.split("-");
  const ExcelFile = ExportExcel.ExcelFile;
  const ExcelSheet = ExportExcel.ExcelSheet;
  const ExcelColumn = ExportExcel.ExcelColumn;

  useEffect(() => {
    const getIns = async () => {
      try {
        const fetched = await apiCall({
          url: `inscripciones/${evt.id}`,
          method: "GET",
          headers: { "Content-Type": "Application/Json", authorization: token },
        });
        const data = await fetched.json();
        setInscriptos(data);
      } catch (error) {
        console.error(error);
      }
    };
    getIns();
  }, []);
  return (
    <Card>
      <Table>
        <TableHead>
          <TableCell>Nombre</TableCell>
          <TableCell>DNI</TableCell>
          <TableCell>Fecha de Nacimiento</TableCell>
        </TableHead>
        <TableBody>
          {inscriptos?.map((element) => {
            let fechaSplit = element.fecNac.split("-");
            return (
              <TableRow key={element.id}>
                <TableCell>
                  {element.apellido}, {element.nombre}
                </TableCell>
                <TableCell>{element.dni}</TableCell>
                <TableCell>
                  {fechaSplit[2] + "/" + fechaSplit[1] + "/" + fechaSplit[0]}
                </TableCell>
                <TableCell>
                  <Button color="primary">X</Button>
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell>
              <Button color="secondary">Editar</Button>
            </TableCell>
            <TableCell>
              <ExcelFile
                element={
                  <Button variant="contained" color="primary">
                    Reportar
                  </Button>
                }
                filename={`Nómina de pilotos alta - ${evento.pista} - ${evento.fecha} - ${evento.prov} - ${evento.loc}`}
              >
                <ExcelSheet
                  data={inscriptos}
                  name={`Nómina de pilotos alta - ${evento.pista} - ${evento.fecha} - ${evento.prov} - ${evento.loc}`}
                >
                  <ExcelColumn label="Nombre" value="nombre"/>
                  <ExcelColumn label="Apellido" value="apellido"/>
                  <ExcelColumn label="DNI" value="dni"/>
                  <ExcelColumn label="Fecha de nacimiento" value="fecNac"/>
                </ExcelSheet>
              </ExcelFile>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
