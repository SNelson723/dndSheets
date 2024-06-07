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
    // axios.get('/api/getAllAbilities')
    //   .then(({data}) => {
    //     console.log(data);
    //     setAbilities(data);
    //   })
    //   .catch(error => console.error(error));

    axios.get('/user/stats/3')
      .then(({ data }) => {
        console.log(data);
        setAbilities(data);
      })
      .catch(error => console.error(error));
  }, [])

  return (
    <div>
      {baseStats.map((ability, i) => (
        <div className="text-center text-black py-2">
          <div className='fs-4' style={{display: 'flex'}}>
          <p id={`profile-${ability}`} className='text-left'>{ability}</p>
          <label className='text-right' for={`profile-${ability}`}>+3</label>
          </div>
          <div className='fs-5 text-center'>
            Actual Number
          </div>
        </div>
      ))}
    </div>
  )
};

export default BaseStatsTable;