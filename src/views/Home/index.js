import { React, useEffect, useState } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Card, TextField, CardMedia } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EventIcon from "@material-ui/icons/Event";
import PilotIcon from "@material-ui/icons/SportsMotorsports";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import logoCobertura from "../../img/LogoCoberturaMedicaHeader.png";
import useStyles from "./style";

import Pilotos from "./components/Pilotos/PilotosLista/PilotosLista.js";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

export default function PersistentDrawerLeft({ token, onLogout }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [sistema, setSistema] = useState(1);
  const [Busq, setBusq] = useState("");
  const history = useHistory();
  if (token === "") {
    history.push("/login");
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logoutHandler = () => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Está seguro de que quiere terminar la sesión.",
      showCancelButton: true,
      cancelButtonColor: "#d63031",
      confirmButtonColor: "#0984e3",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Hasta Pronto!!");
        /* cerrar sesión */
        localStorage.setItem("token", "");
        onLogout();
      } else {
        Swal.fire("Cierre de sesión Cancelado");
      }
    });
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <CardMedia
            className={classes.logoCobertura}
            component="img"
            height="150"
            image={logoCobertura}
            alt="Logo Cobertura Médica"
          />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className = { classes.drawerHeader }>
          <IconButton onClick = { handleDrawerClose }>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            key="eventosRuta"
            onClick={() => {
              alert("Eventos");
            }}
          >
            <ListItemIcon>
              {" "}
              <EventIcon color="primary" />{" "}
            </ListItemIcon>
            <ListItemText primary="Eventos" />
          </ListItem>
          <ListItem
            button
            key="pilotosRuta"
            onClick={() => {
              alert("pilotos");
            }}
          >
            <ListItemIcon>
              {" "}
              <PilotIcon color="primary" />{" "}
            </ListItemIcon>
            <ListItemText primary="Pilotos" />
          </ListItem>
          <Divider />
          <ListItem
            button
            key="accidentesRuta"
            onClick={() => {
              alert("ACCIDENTES");
            }}
          >
            <ListItemIcon>
              {" "}
              <LocalHospitalIcon color="primary" />{" "}
            </ListItemIcon>
            <ListItemText primary="Accidentes" />
          </ListItem>
          <Divider />
          <ListItem button key="cerrarSesion" onClick={() => logoutHandler()}>
            <ListItemIcon>
              {" "}
              <PowerSettingsNewIcon color="primary" />{" "}
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Divider />
        <div className={classes.workSpace}>
          <Pilotos token = {token} />
        </div>
      </main>
    </div>
  );
}
