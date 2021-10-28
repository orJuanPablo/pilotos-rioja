import React from "react";
import { Card, CardMedia } from "@material-ui/core";
import { useHistory } from "react-router";
import logo from "../../img/404.jpg";
import useStyles from "../Home/style";

export default function FourOFour() {
  const hist = useHistory();
  const classes = useStyles();
  const toLogin = () => {
    const tkn = localStorage.getItem("token");
    tkn !== null ? hist.push("/home") : hist.push("/login");
  };
  return (
    <div className="container fluid" >
      <Card>
        <CardMedia className={classes.card404}>
          <CardMedia
            className={classes.logo404}
            component="img"
            height="100%"
            image={logo}
            alt="Lo sentimos no hemos podido encontrar tu página"
            onClick={toLogin}
          />
        </CardMedia>
        <a href="http://www.freepik.com">Designed by Freepik</a>
      </Card>
    </div>
  );
}
