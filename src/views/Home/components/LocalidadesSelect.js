import { MenuItem, Select } from "@material-ui/core";
import { useEffect, useState } from "react";
import apiCall from "../../../api";
import useStyles from "../style";

export default function LocalidadesSelect({
  token,
  selectedProv,
  onSelectLoc,
}) {
  const classes = useStyles();
  const [localidades, setLocalidades] = useState([]);
  const [filteredLocs, setFilteredLocs] = useState([]);
  useEffect(() => {
    const getLocalidades = async () => {
      const fetchedLocs = await apiCall({
        url: "localidades",
        headers: {
          "Content-Type": "application/json",
          authorization: { token },
        },
      });
      const data = await fetchedLocs.json();
      setLocalidades(data);
    };
    getLocalidades();
  }, []);
  useEffect(() => {
    const filtered = localidades.filter((value) => {
      return value.clo_prov === selectedProv;
    });
    setFilteredLocs(filtered);
  }, [selectedProv]);
  const handleLocChange = (evt) => {
    onSelectLoc(evt.target.value);
  };
  return (
    <Select
      label="Localidad"
      onChange={(evt) => handleLocChange(evt)}
      className={classes.selectForm}
      defaultValue={0}
    >
      <MenuItem value={0}>Sin selección</MenuItem>
      {filteredLocs?.map((value) => {
        return (
          <MenuItem value={value.clo_id}>
            {" " + value.clo_nombre + " "}
          </MenuItem>
        );
      })}
    </Select>
  );
}
