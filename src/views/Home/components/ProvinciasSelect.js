import { MenuItem, Select } from "@material-ui/core";
import React, { useState } from "react";
import apiCall from "../../../api";
import useStyles from "../style";

export default function ProvinciasSelect({ onSelectProv }) {
  const classes = useStyles();
  const [provincias, setProvincias] = useState([]);
  const handleProvChange = ({ target }) => {
    const prov = target.value;
    onSelectProv(prov);
  };
  useEffect(() => {
    const getProv = async (token) => {
      try {
        const provFetched = await apiCall({
          url: "provincias",
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
    getProv();
    console.log()
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
