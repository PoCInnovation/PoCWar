import React from 'react';
import Logo from '../../assets/PocWarLogo.png'
import './PocWarLogo.css'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  pocWarLogo: {
    paddingLeft: 17,
    paddingRight: 17,
  }
}));

export default function PocWarLogo({ className }) {
  const classes = useStyles();

  return (
    <div className='pocWarLogoContainer'>
      <img alt='PocWarLogo' className={`${className} ${classes.pocWarLogo}`} src={String(Logo)} />
    </div>
  );
}
