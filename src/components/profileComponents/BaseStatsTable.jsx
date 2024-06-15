import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { setModifiers } from '/src/modifierFunctions';

const BaseStatsTable = ({ abilities }) => {
  return (
    <div className='m-3' style={{width: '5vw'}}>
      {Object.entries(abilities).map(ability => (
        <div key={ability[0]} className="text-center mx-auto baseStat">
            <p className='title' id={`profile-${ability[0]}`} style={{marginBottom: '0', marginTop: '0.5rem'}}>{ability[0].substring(0, 3)}</p>
            <h5 style={{marginBottom: '0'}}>{ability[1]}</h5>
            <p style={{marginRight: '2px'}}>{setModifiers(ability[1])}</p>
        </div>
      ))}
    </div>
  )
};

export default BaseStatsTable;