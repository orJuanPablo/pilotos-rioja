import React, { useState } from "react";
import PilotosContext from "./index";
import apiCall from "../../api";

export default function PilotosProvider({ children }) {
  const [pilotos, setPilotos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [localidades, setLocalidades] = useState([]);

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

  const getLocs = async (token) => {
    try {
      const locFetched = await apiCall({
        url: "http://192.168.1.14:3000/api/localidades",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      setLocalidades(locFetched);
    } catch (error) {
      console.error(error);
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
