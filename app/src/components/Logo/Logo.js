import React from 'react';
import logoPocwar from '../../assets/logo-pocwar.png'
import './Logo.css';

export default function Logo() {
  return (
    <div className='Logo'>
      <img alt='pocwarLogo' style={{ width: 120 }} src={String(logoPocwar)} />
    </div>
  );
}