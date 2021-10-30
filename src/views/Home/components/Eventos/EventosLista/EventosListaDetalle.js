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
import DeleteIcon from "@material-ui/icons/Backspace";
import apiCall from "../../../../../api";
import Swal from "sweetalert2";

export default function EventosListaDetalle({ token, evt }) {
  const [inscriptos, setInscriptos] = useState([]);
  const evento = evt;
  const ExcelFile = ExportExcel.ExcelFile;
  const ExcelSheet = ExportExcel.ExcelSheet;
  const ExcelColumn = ExportExcel.ExcelColumn;
  const getIns = async () => {
    try {
      const fetched = await apiCall({
        url: `inscripciones/${evento.id}`,
        method: "GET",
        headers: { "Content-Type": "Application/Json", authorization: token },
      });
      const data = await fetched.json();
      setInscriptos(data);
      console.log(inscriptos);
    } catch (error) {
      console.error(error);
    }
  };
  const delIns = async (id) => {
    try {
      const fetched = await apiCall({
        url: `inscripciones/${id}`,
        method: "Delete",
        headers: { "Content-Type": "Application/Json", authorization: token },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteClick = (datos) => {
    delIns(datos)
      .then(
        Swal.fire({
          title: "Inscripción Eliminada",
          text: "El piloto ha sido desvinculado del evento.",
          icon: "success",
          showConfirmButton: true,
        })
      )
      .then(getIns())
      .catch(null);
  };
  useEffect(() => {
    getIns();
  }, []);
  useEffect(() => {
    console.log(inscriptos);
  }, [inscriptos]);
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
              <TableRow key={element.idI}>
                <TableCell>
                  {element.apellido}, {element.nombre}
                </TableCell>
                <TableCell>{element.dni}</TableCell>
                <TableCell>
                  {fechaSplit[2] + "/" + fechaSplit[1] + "/" + fechaSplit[0]}
                </TableCell>
                <TableCell>
                  <DeleteIcon
                    color="primary"
                    onClick={() => handleDeleteClick(element.idI)}
                  ></DeleteIcon>
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
                  <ExcelColumn label="Nombre" value="nombre" />
                  <ExcelColumn label="Apellido" value="apellido" />
                  <ExcelColumn label="DNI" value="dni" />
                  <ExcelColumn label="Fecha de nacimiento" value="fecNac" />
                </ExcelSheet>
              </ExcelFile>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
