import React, { useState } from "react";
import PilotosContext from "./index";
import apiCall from "../../api";

export default function PilotosProvider({ children }) {
  const [pilotos, setPilotos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [localidades, setLocalidades] = useState([]);

  const getPilotos = async ({ token }) => {
    try {
      const pilotosFetched = await apiCall({
        url: "http://192.168.1.14:3000/api/pilotos",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      setPilotos(pilotosFetched);
      return pilotosFetched;
    } catch (error) {
      console.error(error);
      setPilotos([]);
    }
  };
  const getProv = async (token) => {
    try {
      const provFetched = await apiCall({
        url: "http://192.168.1.14:3000/api/provincias",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      setProvincias(provFetched);
    } catch (error) {
      console.error(error);
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
      value={{ getPilotos, pilotos, getProv, provincias, getLocs, localidades }}
    >
      {children}
    </PilotosContext.Provider>
  );
}
