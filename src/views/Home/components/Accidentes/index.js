import { Card, CardMedia, Typography } from "@material-ui/core";
import logo from "../../../../img/enConstruccion.jpg";
import React from "react";

export default function index() {
  return (
    <Card>
      <CardMedia >
        <CardMedia
          component="img"
          image={logo}
          alt="Estamos trabajando"
        />
      </CardMedia>
      <a href="http://www.freepik.com">Designed by Freepik</a>
    </Card>
  );
}
