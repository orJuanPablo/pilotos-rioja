import { Card, CardMedia } from "@material-ui/core";
import { useHistory } from "react-router";
import logo from "../../img/LogoCoberturaMedica.png";
import useStyles from "../Home/style";

export default function Landing() {
  const hist = useHistory();
  const classes = useStyles;
  const toLogin = () => {
    const tkn = localStorage.getItem("token");
    tkn !== null ? hist.push("/home") : hist.push("/login");
  };
  return (
    <div className="container">
      <Card>
        <CardMedia>
          <CardMedia
            className={classes.logoCobertura}
            component="img"
            height="100%"
            image={logo}
            alt="Logo Cobertura Médica"
            onClick={toLogin}
          />
        </CardMedia>
      </Card>
    </div>
  );
}
