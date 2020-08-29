import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import DarkLogo from '../../assets/dark-logo.png';
import LightLogo from '../../assets/light-logo.png';
import { homeRoute } from '../../consts/routes';

const useStyles = makeStyles(() => ({
  pocWarLogo: {
    paddingLeft: 17,
    paddingRight: 17,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    cursor: 'pointer',
    maxWidth: 100,
    maxHeight: 100,
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
    <div className='pocWarLogoContainer' onClick={redirectHome}>
      <img
        alt='PocWarLogo'
        className={`${className} ${classes.pocWarLogo}`}
        src={src}
      />
    </div>
  );
}
