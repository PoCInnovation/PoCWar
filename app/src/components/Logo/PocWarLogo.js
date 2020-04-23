import React from 'react';
import Logo from '../../assets/PocWarLogo.png'
import './PocWarLogoContainer.css'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  pocWarLogo: {
    paddingLeft: 17,
    paddingRight: 17,
    marginLeft: 'auto',
    marginRight: 'auto',
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
