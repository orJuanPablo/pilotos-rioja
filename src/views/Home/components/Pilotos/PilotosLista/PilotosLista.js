import {
  Button,
  Container,
  Icon,
  TextField,
  Modal,
  Typography,
  Select,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  Card,
  TableBody,
  TableHead,
  CardHeader,
  TableFooter,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useEffect, useContext, useState } from "react";
import Swal from "sweetalert2";
import useStyle from "../../../style";
import PilotosItemLista from "./PilotosItemLista";
import PilotosContext from "../../../../../context/pilotos";
import ProvinciasSelect from "../../ProvinciasSelect";
import LocalidadesSelect from "../../LocalidadesSelect";
import apiCall from "../../../../../api";

export default function PilotosLista({ token }) {
  const classes = useStyle();
  const { getPilotos, pilotos, getEventos, eventos } =
    useContext(PilotosContext);
  const [pilotosLocal, setPilotosLocal] = useState([]);
  const [eventosLocal, setEventosLocal] = useState([]);
  const [modalAdd, setmodalAdd] = useState(false);
  const [modalIns, setmodalIns] = useState(false);
  const [prov, setProv] = useState(0);
  const [loc, setLoc] = useState(0);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [piloto, setPiloto] = useState(0);
  const [evento, setEvento] = useState(0);
  useEffect(() => {
    getPilotos({ token });
    getEventos({ token });
  }, []);
  useEffect(() => {
    setPilotosLocal(pilotos);
  }, [pilotos]);
  useEffect(() => {
    const dataEvts = eventos?.filter((value) => {
      return value.estado === 1;
    });
    setEventosLocal(dataEvts);
  }, [eventos]);
  const buscarPilotos = ({ target }) => {
    if (pilotos?.length) {
      const search = target.value;
      const filteredPilotos = pilotos.filter((value) => {
        return (
          value.nombre.includes(search) ||
          value.apellido.includes(search) ||
          value.dni.includes(search)
        );
      });
      setPilotosLocal(filteredPilotos);
    }
  };
  const onEditPiloto = (piloto) => {
    console.log(piloto);
  };

  const onInsPiloto = (piloto) => {
    setPiloto(piloto);
    handleModal("Ins");
  };
  const onSelectProv = (provincia) => {
    setProv(provincia);
  };
  const onSelectLoc = (localidad) => {
    setLoc(localidad);
  };
  const handleModal = (tipo) => {
    switch (tipo) {
      case "Add":
        setmodalAdd(!modalAdd);
        break;
      case "Ins":
        setmodalIns(!modalIns);
        break;
      default:
        break;
    }
  };
  const addPiloto = () => {
    const piloto = {
      nombre: document.getElementById("pil_nombre").value,
      apellido: document.getElementById("pil_apellido").value,
      dni: document.getElementById("pil_dni").value,
      fecNac:
        selectedDate.getFullYear() +
        "-" +
        (selectedDate.getMonth() + 1) +
        "-" +
        selectedDate.getDate(),
      tel: document.getElementById("pil_tel").value,
      email: document.getElementById("pil_email").value,
      prov: prov,
      loc: loc,
      dom: document.getElementById("pil_dom").value,
    };
    apiCall({
      url: "pilotos",
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify(piloto),
    })
      .then((res) => {
        handleModal("Add");
        getPilotos({ token });
        Swal.fire({
          title: "Piloto anotado",
          text: "el piloto se ha añadido a la base de datos.",
          icon: "success",
          showConfirmButton: true,
        });
      })
      .catch(null);
  };
  const inscribir = () => {
    const ins = {
      ins_evt: evento,
      ins_pil: piloto,
    };
    apiCall({
      url: "inscripciones",
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify(ins),
    });
    handleModal("Ins");
    Swal.fire({
      title: "Piloto anotado",
      text: "el piloto se ha añadido a la lista de inscripción",
      icon: "success",
      showConfirmButton: true,
    });
  };
  const bodyAdd = (
    <Card className={classes.modalAdd}>
      <CardHeader className={classes.modalTitle} aria-label></CardHeader>
      <Typography variant="h3" color="primary">
        Nuevo Piloto
      </Typography>
      <TextField
        className={classes.formTextField}
        color="primary"
        id="pil_nombre"
        label="Nombre"
        required
      />
      <TextField
        className={classes.formTextField}
        color="primary"
        id="pil_apellido"
        label="Apellido"
        required
      />
      <TextField
        className={classes.formTextField}
        color="primary"
        id="pil_dni"
        label="DNI"
        required
      />
      <KeyboardDatePicker
        className={classes.formTextField}
        clearable
        value={selectedDate}
        placeholder="dd/MM/YYYY"
        label="Fecha de Nacimiento"
        onChange={(date) => {
          handleDateChange(date);
        }}
        maxDate={new Date()}
        format="dd/MM/yyyy"
        required
      />
      <TextField
        className={classes.formTextField}
        color="primary"
        id="pil_tel"
        label="Teléfono"
        required
      />
      <TextField
        className={classes.formTextField}
        color="primary"
        id="pil_email"
        label="E-mail"
      />
      <ProvinciasSelect
        className={classes.selectForm}
        id="pil_cpr"
        token={token}
        onSelectProv={onSelectProv}
      />
      <LocalidadesSelect
        className={classes.selectForm}
        id="pil_clo"
        token={token}
        selectedProv={prov}
        onSelectLoc={onSelectLoc}
      />
      <TextField
        className={classes.formTextField}
        color="primary"
        id="pil_dom"
        label="Domicilio"
      />
      <br />
      <br />
      <Button
        id="create"
        variant="contained"
        color="secondary"
        onClick={(evt) => {
          addPiloto();
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
  const bodyIns = (
    <Card className={classes.modalAdd}>
      <Typography variant="h5" color="secondary">
        Asegurar Piloto
      </Typography>
      <Select
        className={classes.formTextField}
        id="selectEvento"
        onChange={(evt) => setEvento(evt.target.value)}
      >
        {eventosLocal?.map((evento) => {
          let fechaSplit = evento.fecha.split("-");
          return (
            <option value={evento.id} key={evento.id}>
              {evento.tipo} - {evento.loc} -{" "}
              {fechaSplit[2] + "/" + fechaSplit[1] + "/" + fechaSplit[0]}
            </option>
          );
        })}
      </Select>
      <br />
      <br />
      <br />
      <Button onClick={() => inscribir()} variant="contained" color="secondary">
        Inscribir
      </Button>
      &nbsp; &nbsp;
      <Button
        onClick={() => handleModal("Ins")}
        variant="contained"
        color="primary"
      >
        Cancelar
      </Button>
    </Card>
  );
  return (
    <Container className={classes.pilContainer}>
      <TableContainer className={classes.customTableContainer}>
        <Table className={classes.pilTable} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Nombre y Apellido</TableCell>
              <TableCell>DNI</TableCell>
              <TableCell>Fecha de Nacimiento</TableCell>
              <TableCell>Télefono</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell className={classes.searchContainer}>
                <Icon>
                  {" "}
                  <SearchIcon color="primary" />{" "}
                </Icon>
                <TextField
                  color="primary"
                  placeholder="Buscar..."
                  onChange={(evt) => buscarPilotos(evt)}
                >
                  {""}
                </TextField>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pilotosLocal !== [] ? (
              <PilotosItemLista
                pilotos={pilotosLocal}
                onEditPiloto={onEditPiloto}
                onInsPiloto={onInsPiloto}
              />
            ) : (
              <br />
            )}
            <TableFooter>
              <Button
                className={classes.addPiloto}
                onClick={() => handleModal("Add")}
                variant="contained"
                color="primary"
              >
                Agregar Piloto
              </Button>
            </TableFooter>
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={modalAdd} onClose={() => handleModal("Add")}>
        {bodyAdd}
      </Modal>
      <Modal open={modalIns} onClose={() => handleModal("Ins")}>
        {bodyIns}
      </Modal>
    </Container>
  );
}
