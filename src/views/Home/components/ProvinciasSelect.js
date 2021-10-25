import { MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import apiCall from "../../../api";
import useStyles from "../style";

export default function ProvinciasSelect({ onSelectProv, token }) {
  const classes = useStyles();
  const [provincias, setProvincias] = useState([]);
  const handleProvChange = ({ target }) => {
    const prov = target.value;
    onSelectProv(prov);
  };
  useEffect(() => {
    const getProv = async () => {
      try {
        const provFetched = await apiCall({
          url: "provincias",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });
        const dataProv = await provFetched.json();
        setProvincias(dataProv);
      } catch (error) {
        console.error(error);
      }
    };
    getProv();
  }, []);
  return (
    <Select
      label="Provincia"
      onChange={(evt) => handleProvChange(evt)}
      className={classes.selectForm}
      defaultValue={0}
    >
      <MenuItem value={0}>Sin selección</MenuItem>
      {provincias?.map((value) => {
        return (
          <MenuItem value={value.cpr_id} key={value.cpr_id}>
            {" "}
            {value.cpr_nombre}{" "}
          </MenuItem>
        );
      })}
    </Select>
  );
}
