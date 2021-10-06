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
  Checkbox,
  CardHeader,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import useStyle from "../../../style";
import PilotosItemLista from "./PilotosItemLista";
import PilotosContext from "../../../../../context/pilotos";
import EventosLista from "../../Eventos/EventosLista/EventosLista";
import ProvinciasSelect from "../../ProvinciasSelect";
import LocalidadesSelect from "../../LocalidadesSelect";
import apiCall from "../../../../../api";
import { Label } from "@material-ui/icons";

export default function PilotosLista({ token }) {
  const classes = useStyle();
  const hist = useHistory();
  const {
    getPilotos,
    pilotos,
    getEventos,
    eventos,
    getProv,
    provincias,
    localidades,
    getLocs,
  } = useContext(PilotosContext);
  const [pilotosLocal, setPilotosLocal] = useState([]);
  const [eventosLocal, setEventosLocal] = useState([]);
  const [modalAdd, setmodalAdd] = useState(false);
  const [modalIns, setmodalIns] = useState(false);
  const [prov, setProv] = useState(0);
  const [loc, setLoc] = useState(0);
  const [filteredLocs, setFilteredLocs] = useState([]);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [piloto, setPiloto] = useState(0);
  const [evento, setEvento] = useState(0);
  let action = "";
  useEffect(() => {
    try {
      getPilotos({ token }).then((dataPilotos) => {
        setPilotosLocal(dataPilotos);
      });
      getEventos({ token }).then((dataEventos) => {
        setEventosLocal(
          dataEventos.filter((evt) => {
            return evt.estado === 1;
          })
        );
      });
      getProv({ token });
      getLocs({ token });
    } catch (error) {
      setPilotosLocal([]);
    }
  }, []);
  const mostrarError = () => {
    Swal.fire({
      title: "Error 400",
      text: "Los datos del formulario están incompletos o no son válidos.",
      confirmButton: true,
    });
  };

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
  const onSelctProv = (prov) => {
    setProv(prov);
    setFilteredLocs(localidades.filter((value) => value.clo_prov == prov));
  };
  const onSelectLoc = (loc) => {
    setLoc(loc);
  };
  const handleModal = (tipo) => {
    console.log(tipo);
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
        selectedDate.getMonth() +
        "-" +
        selectedDate.getDate(),
      tel: document.getElementById("pil_tel").value,
      email: document.getElementById("pil_email").value,
      prov: prov,
      loc: loc,
      dom: document.getElementById("pil_dom").value,
    };
    apiCall({
      url: "http://192.168.1.14:3000/api/pilotos",
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: token },
      body: JSON.stringify(piloto),
    })
      .then((res) => {
        handleModal("Add");

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
      url: "http://localhost:3000/api/inscripciones/",
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
      <CardHeader  className={classes.modalTitle} aria-label>
        
      </CardHeader>
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
          const fecha =
            date?.getFullYear() +
            "-" +
            (date?.getMonth() + 1) +
            "-" +
            date?.getDate();
          console.log(fecha);
          console.log(date);
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
        provincias={provincias}
        onSelectProv={onSelctProv}
      />
      <LocalidadesSelect
        className={classes.selectForm}
        id="pil_clo"
        localidades={filteredLocs}
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
          let fecha = new Date(evento.fecha);
          return (
            <option value={evento.id} key={evento.id}>
              {evento.tipo} - {evento.loc} -{" "}
              {fecha.getDate() +
                1 +
                "/" +
                (fecha.getMonth() + 1) +
                "/" +
                fecha.getFullYear()}
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
      <TableContainer>
        <Table className={classes.pilTable}>
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
            <PilotosItemLista
              pilotos={pilotosLocal}
              onEditPiloto={onEditPiloto}
              onInsPiloto={onInsPiloto}
            />
          </TableBody>
        </Table>
        <Button
          className={classes.addPiloto}
          onClick={() => handleModal("Add")}
          variant="contained"
          color="primary"
        >
          Agregar Piloto
        </Button>
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
