import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import DarkLogo from '../../assets/dark-logo.png';
import LightLogo from '../../assets/pocwar-logo2.png';
import { homeRoute } from '../../consts/routes';

const useStyles = makeStyles(() => ({
  pocWarLogo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 5,
    marginTop: 5,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    cursor: 'pointer',
  },
}));

export default function PocWarLogo({ className }) {
  const classes = useStyles();
  const history = useHistory();
  const darkMode = false;
  const redirectHome = () => {
    history.push(homeRoute);
  };
  const src = String(darkMode ? DarkLogo : LightLogo);

  return (
    <div role='presentation' className='pocWarLogoContainer' onClick={redirectHome}>
      <img
        alt='PocWarLogo'
        className={`${className} ${classes.pocWarLogo}`}
        src={src}
      />
    </div>
  );
}
