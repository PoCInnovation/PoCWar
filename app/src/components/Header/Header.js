import React from 'react';
import Logo from '../Logo/Logo.js';
import './Header.css';
import { Grid } from '@material-ui/core';

export default function Header() {
  return (
    <Grid container xs={12} className="Header">
      <Grid item xs={1}>
        <Logo />
      </Grid>
    </Grid>
  );
}