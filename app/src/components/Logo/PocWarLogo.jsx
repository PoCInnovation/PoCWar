import React from "react";
import Logo from "../../assets/PocWarLogo.png";
import "./PocWarLogoContainer.css";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { homeRoute } from "../../consts/routes";

const useStyles = makeStyles(() => ({
  pocWarLogo: {
    paddingLeft: 17,
    paddingRight: 17,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function PocWarLogo({ className }) {
  const classes = useStyles();
  const history = useHistory();
  const redirectHome = () => {
    history.push(homeRoute);
  };

  return (
    <div className="pocWarLogoContainer" onClick={redirectHome}>
      <img
        alt="PocWarLogo"
        className={`${className} ${classes.pocWarLogo}`}
        src={String(Logo)}
      />
    </div>
  );
}
