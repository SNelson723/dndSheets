import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { setModifiers } from '/src/modifierFunctions';

const BaseStatsTable = ({ abilities }) => {
  return (
    <div className='py-1' style={{width: '12vw'}}>
      {Object.entries(abilities).map((ability, i) => (
        <div key={ability[0]} className="text-center">
          <div className='' style={{display: 'flex', justifyContent: 'center'}}>
          <p id={`profile-${ability[0]}`} className='text-left' style={{marginRight: '0.5rem'}}>{ability[0]}</p>
          <label className='text-right' htmlFor={`profile-${ability[0]}`}>{setModifiers(ability[1])}</label>
          </div>
          <div className='text-center'>
            {ability[1] > 0 ? `+${ability[1]}` : ability[1]}
          </div>
        </div>
      ))}
    </div>
  )
};

export default BaseStatsTable;