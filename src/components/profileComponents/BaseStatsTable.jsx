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
    axios.get('/api/getAllAbilities')
      .then(({data}) => {
        console.log(data);
        setAbilities(data);
      })
      .catch(error => console.error(error));
  }, [])
  return (
    <table style={{display: 'flex', justifyContent: 'center', width: 'auto'}}>
      <tbody>
        <tr className="text-center">
          {baseStats.map(ability => <td className='mx-5' key={ability}>{ability}</td>)}
        </tr>
        <tr className="text-center mx-5">
          {baseStats.map((ability, i) => <td className='mx-5' key={i}> +3 </td>)}
        </tr>
      </tbody>
    </table>
  )
};

export default BaseStatsTable;