import {
  Container,
  Table,
  TableCell,
  TableRow,
  Button,
  TableHead,
  Modal,
  Card,
  CardHeader,
  Typography,
  TextField,
  TableFooter,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiCall from "../../../../../api";
import useStyles from "../../../style";
import LocalidadesSelect from "../../LocalidadesSelect";
import ProvinciasSelect from "../../ProvinciasSelect";
import EventosItemLista from "./EventosItemLista";

export default function EventosLista({ token }) {
  const classes = useStyles();
  const [eventos, setEventos] = useState([]);
  const [modalAdd, setmodalAdd] = useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [prov, setProv] = useState(0);
  const [loc, setLoc] = useState(0);
  const [modalEdit, setmodalEdit] = useState(false);
  const handleModal = (tipo) => {
    switch (tipo) {
      case "Add":
        setmodalAdd(!modalAdd);
        break;
      case "Ins":
        setmodalEdit(!modalEdit);
        break;
      default:
        break;
    }
  };
  const onSelectProv = (provincia) => {
    setProv(provincia);
  };
  const onSelectLoc = (localidad) => {
    setLoc(localidad);
  };
  const getEventos = async () => {
    try {
      const eventosFetched = await apiCall({
        url: "eventos",
        headers: {
          "Content-Type": "Application/json",
          authorization: token,
        },
      });
      const data = await eventosFetched.json();
      setEventos(data);
    } catch (error) {
      console.error(error);
      setEventos([]);
    }
  };
  const addEvento = () => {
    const evento = {
      tipo: 1,
      estado: 1,
      fecha:
        selectedDate.getFullYear() +
        "-" +
        (selectedDate.getMonth() + 1) +
        "-" +
        selectedDate.getDate(),
      prov,
      loc,
      pista: document.getElementById("evt_pista").value,
    };
    apiCall({
      url: "eventos",
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify(evento),
    })
      .then((res) => {
        handleModal("Add");
        getEventos({ token });
        Swal.fire({
          title: "Nuevo Evento",
          text: "El evento se ha añadido a la base de datos.",
          icon: "success",
          showConfirmButton: true,
        });
      })
      .catch(null);
  };
  const bodyAdd = (
    <Card className={classes.modalAdd}>
      <CardHeader className={classes.modalTitle}></CardHeader>{" "}
      <Typography variant="h3" color="primary">
        Nuevo Evento
      </Typography>
      <KeyboardDatePicker
        className={classes.formTextField}
        clearable
        value={selectedDate}
        placeholder="dd/MM/YYYY"
        label="Fecha de Evento"
        onChange={(date) => {
          handleDateChange(date);
        }}
        format="dd/MM/yyyy"
        required
      />
      <ProvinciasSelect
        className={classes.selectForm}
        token={token}
        onSelectProv={onSelectProv}
      />
      <LocalidadesSelect
        className={classes.selectForm}
        token={token}
        selectedProv={prov}
        onSelectLoc={onSelectLoc}
      />
      <TextField
        className={classes.formTextField}
        color="primary"
        id="evt_pista"
        label="Pista"
      />
      <br />
      <br />
      <Button
        id="create"
        variant="contained"
        color="secondary"
        onClick={() => {
          addEvento();
        }}
      >
        Aceptar
      </Button>
      <Button
        id="cancel"
        variant="contained"
        color="primary"
        onClick={() => {
          handleModal("Add");
        }}
      >
        Cancelar
      </Button>
    </Card>
  );
  const bodyEdit = <Card></Card>;
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
        <TableFooter>
          <Button
            className={classes.addPiloto}
            onClick={() => handleModal("Add")}
            variant="contained"
            color="primary"
          >
            Agregar Evento
          </Button>
        </TableFooter>
      </Table>
      <Modal open={modalAdd} onClose={() => handleModal("Add")}>
        {bodyAdd}
      </Modal>
      <Modal open={modalEdit} onClose={() => handleModal("Edit")}>
        {bodyEdit}
      </Modal>
    </Container>
  );
}
