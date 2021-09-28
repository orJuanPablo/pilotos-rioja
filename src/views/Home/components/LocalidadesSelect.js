import { MenuItem, Select } from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";
import { useEffect } from "react";
import useStyles from "../style";

export default function ProvinciasSelect({ localidades, onSelectLoc }) {
 const classes = useStyles();
  const handleLocChange = ({ target }) => {
    const loc = target.value;
    onSelectLoc(loc);
  };
  useEffect(() => {
    return (
      <Select
        label="Localidades"
        onChange={(evt) => handleLocChange(evt)}
        className={classes.selectForm}
      >
        {localidades?.map((value) => {
          return <MenuItem value={value.clo_id}>{value.clo_nombre}</MenuItem>;
        })}
      </Select>
    );
  }, [localidades]);
  return (
    <Select
      label="Localidades"
      onChange={(evt) => handleLocChange(evt)}
      className={classes.selectForm}
    >
      {localidades?.map((value) => {
        return <MenuItem value={value.clo_id}>{value.clo_nombre}</MenuItem>;
      })}
    </Select>
  );
}
