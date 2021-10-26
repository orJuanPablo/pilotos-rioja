import React, { useState } from "react";
import PilotosContext from "./index";
import apiCall from "../../api";

export default function PilotosProvider({ children }) {
  const [pilotos, setPilotos] = useState([]);
  const [eventos, setEventos] = useState([]);

  const getPilotos = async ({ token }) => {
    try {
      const pilotosFetched = await apiCall({
        url: "pilotos",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await pilotosFetched.json();
      setPilotos(data);
    } catch (error) {
      console.error(error);
      setPilotos([]);
    }
  };
  const getEventos = async ({ token }) => {
    try {
      const eventosFetched = await apiCall({
        url: "eventos",
        headers: {
          "Content-Type": "application/json",
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
  return (
    <PilotosContext.Provider
      value={{ getPilotos, pilotos, getEventos, eventos }}
    >
      {children}
    </PilotosContext.Provider>
  );
}
