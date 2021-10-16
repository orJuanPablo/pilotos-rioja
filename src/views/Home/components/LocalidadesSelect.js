import { MenuItem, Select } from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";
import { useEffect, useState } from "react";
import apiCall from "../../../api";
import useStyles from "../style";

export default function ProvinciasSelect({token, selectedProv, onSelectLoc }) {
  const classes = useStyles();
  const [localidades, setLocalidades] = useState([])
  
  useEffect(() => {
    const set = async () => {
      const data = await apiCall({url:'localidades', headers:{"Content-Type":"application/json", authorization: token}})
    }
    
  }, [localidades]);
  const handleLocChange = ({ target }) => {
    const loc = target.value;
    onSelectLoc(loc);
  };
  return (
    <Select
      label="Localidades"
      onChange={(evt) => handleLocChange(evt)}
      className={classes.selectForm}
      defaultValue={0}
    >
      <MenuItem value={0}>Sin selección</MenuItem>
      {localidades?.map((value) => {
        return (
          <MenuItem value={value.clo_id} key={value.clo_id}>
            {value.clo_nombre}
          </MenuItem>
        );
      })}
    </Select>
  );
}
