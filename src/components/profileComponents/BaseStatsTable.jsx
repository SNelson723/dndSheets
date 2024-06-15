import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { setModifiers } from '/src/modifierFunctions';

const BaseStatsTable = ({ abilities }) => {
  return (
    <div className='py-1' style={{width: '12vw'}}>
      {Object.entries(abilities).map(ability => (
        <div key={ability[0]} className="text-center mx-auto" style={{border: '2px solid black', width: '50%', height: '12vh'}}>
            <p id={`profile-${ability[0]}`} style={{marginRight: '0.5rem'}}>{ability[0].substring(0, 3)}</p>
            <h5>{ability[1]}</h5>
            <p>{setModifiers(ability[1])}</p>
        </div>
      ))}
    </div>
  )
};

export default BaseStatsTable;