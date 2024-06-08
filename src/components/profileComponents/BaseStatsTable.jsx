import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';

const BaseStatsTable = ({ stat }) => {
  const [abilities, setAbilities] = useState([]);
  const baseStats = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];

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

  const setModifiers = (ability) => {
    if (ability < 2) {
      return -5;
    } else if (ability < 4) {
      return - 4;
    } else if (ability < 6) {
      return -3
    } else if (ability < 8) {
      return -2;
    } else if (ability < 10) {
      return -1;
    } else if (ability < 12) {
      return 0;
    } else if (ability < 14) {
      return '+1';
    } else if (ability < 16) {
      return '+2';
    } else if (ability < 18) {
      return '+3';
    } else if (ability < 20) {
      return '+4';
    } else if (ability === 20) {
      return '+5';
    }
  }

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