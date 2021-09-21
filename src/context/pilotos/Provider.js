import React, { useState } from "react";
import PilotosContext from "./index";
import apiCall from "../../api";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

export default function PilotosProvider({ children }) {
  const [pilotos, setPilotos] = useState([]);
  const hist = useHistory();

  const orJPalerta = () => {alert('orJuanPablo')};

  const getPilotos = async () => {
    try {
      const pilotosFetched = await apiCall({
        url: "http://192.168.1.14:3000/api/pilotos",
        heders: { authorization: localStorage.getItem("token") },
      });
      console.log(pilotosFetched);
      setPilotos(pilotosFetched);
    } catch (error) {
      setPilotos([]);
    }
  };
  return (
    <PilotosContext.Provider value={{ getPilotos }}>
      {children}
    </PilotosContext.Provider>
  );
}
