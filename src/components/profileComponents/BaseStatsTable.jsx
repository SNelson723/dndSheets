import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';

const BaseStatsTable = ({ stat }) => {
  const [abilities, setAbilities] = useState([]);

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
    // <table style={{display: 'flex', justifyContent: 'center', width: 'auto'}}>
    //   <tbody>
    //     <tr className="text-center">
    //       {abilities.map(ability => <td key={ability}>{ability}</td>)}
    //     </tr>
    //     <tr className="text-center">
    //       {abilities.map((ability, i) => <td key={i}> +3 </td>)}
    //     </tr>
    //   </tbody>
    // </table>
    <div className="grid-container">
      {abilities.map(ability => <div className='grid-item'> {ability} </div>)}
    </div>
  )
};

export default BaseStatsTable;