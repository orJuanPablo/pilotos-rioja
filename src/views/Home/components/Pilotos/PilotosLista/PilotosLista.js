import { List } from "@material-ui/core";
import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import useStyle from "../../../style";
import PilotosItemLista from "./PilotosItemLista";
import PilotosContext from "../../../../../context/pilotos";

export default function PilotosLista({ token }) {
  const classes = useStyle();
  //const hist = useHistory()
  const [pilotos, setPilotos] = useState([]);
  const { getPilotos, orJPalerta } = useContext(PilotosContext);
  console.log(getPilotos);
  useEffect(() => {
    orJPalerta;
  }, []);
  //<PilotosItemLista pilotos={pilotos} />
  return <List className={classes.pilLista}></List>;
}
