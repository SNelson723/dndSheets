import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { setModifiers } from '/src/modifierFunctions';

const BaseStatsTable = ({ stat }) => {
  const [abilities, setAbilities] = useState([]);

  // handle the stat modifiers here when mapping
  // pull from the character table to have access to the modifiers
  useEffect(() =>{
    axios.get('/user/stats/1')
      .then(({ data }) => {
        console.log(data);
        setAbilities(data);
      })
      .catch(error => console.error(error));
  }, [])

  return (
    <div>
      {Object.entries(abilities).map((ability, i) => (
        <div key={ability[0]} className="text-center text-black py-1">
          <div className='' style={{display: 'flex', justifyContent: 'center'}}>
          <p id={`profile-${ability[0]}`} className='text-left' style={{marginRight: '0.5rem'}}>{ability[0]}</p>
          <label className='text-right' htmlFor={`profile-${ability[0]}`}>{setModifiers(ability[1])}</label>
          </div>
          <div className='text-center'>
            {ability[1]}
          </div>
        </div>
      ))}
    </div>
  )
};

export default BaseStatsTable;