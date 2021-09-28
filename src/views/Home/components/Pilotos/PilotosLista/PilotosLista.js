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

export default function PilotosLista({ token }) {
  const classes = useStyle();
  const hist = useHistory();
  const { getPilotos, pilotos, getProv, provincias, localidades, getLocs } =
    useContext(PilotosContext);
  const [pilotosLocal, setPilotosLocal] = useState([]);
  const [modalIns, setModalIns] = useState(false);
  const [prov, setProv] = useState(0);
  const [loc, setLoc] = useState(0);
  const [filteredLocs, setFilteredLocs] = useState([]);
  const [selectedDate, handleDateChange] = useState(new Date());
  useEffect(() => {
    try {
      getPilotos({ token }).then((dataPilotos) => {
        setPilotosLocal(dataPilotos);
      });
      getProv({ token });
      getLocs({ token });
    } catch (error) {
      setPilotosLocal([]);
    }
  }, []);

  const buscarPilotos = ({ target }) => {
    if (pilotos?.length) {
      const search = target.value;
      const filteredPilotos = pilotos.filter((value) => {
        return (
          value.pil_nombre.includes(search) ||
          value.pil_apellido.includes(search) ||
          value.pil_dni.includes(search)
        );
      });
      setPilotosLocal(filteredPilotos);
    }
  };

  const onSelctProv = (prov) => {
    setProv(prov);
    setFilteredLocs(localidades.filter((value) => value.clo_prov == prov));
  };
  const onSelectLoc = (loc) => {
    setLoc(loc);
  };
  const handleModalIns = () => {
    setModalIns(!modalIns);
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
     }).then((res) => {
       handleModalIns()
       Swal.fire({
         title: "Piloto anotado",
         icon: "success",
         showConfirmButton: true,
       });
     }).catch(null);
  };

  const editPiloto = (evt) => {
    alert("editPiloto");
  };

  const insPiloto = (evt) => {};

  const bodyIns = (
    <Card className={classes.modalIns}>
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
        onChange={(date) => handleDateChange(date)}
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
          handleModalIns();
        }}
      >
        Cancelar
      </Button>
    </Card>
  );
  return (
    <Container className={classes.pilContainer}>
      <TableContainer>
        <Table className={classes.pilTable}>
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
          <PilotosItemLista
            pilotos={pilotosLocal}
            evts={(editPiloto, insPiloto)}
          />
          <TableRow>
            <Button
              className={classes.addPiloto}
              onClick={handleModalIns}
              variant="contained"
              color="primary"
            >
              Agregar Piloto
            </Button>
          </TableRow>
        </Table>
      </TableContainer>
      <Modal open={modalIns} onClose={handleModalIns}>
        {bodyIns}
      </Modal>
    </Container>
  );
}
