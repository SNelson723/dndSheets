import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

/**
 * You can use https://www.dnd5eapi.co/api/equipment/spellbook for the spell book
 * or any other piece of equipment the api has info on. Maybe try to get the info
 * via axios then if there is data brought back, make it a link that will open up a modal 
 * to display that information?
 */

const Inventory = ({ inv }) => {
  const [inventory, setInventory] = useState([]);
  const [itemDetails, setItemDetails] = useState({});

  useEffect(() => {
    setInventory(inv.split(', ').map(item => item.toLowerCase()));
  }, []);

  const handleItemClick = (item) => {
    const param = item.split(' ').join('-');

    axios.get(`https://www.dnd5eapi.co/api/equipment/${param}`)
      .then(({ data }) => {
        console.log(data);
        setItemDetails(data);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <div>
        <h3 style={{textAlign: 'center'}}>Inventory</h3>
      </div>
      <div className='mt-1'>
        <ul style={{overflowY: 'auto', maxHeight: '70%'}}>
          {inventory.map((item, i) => <li key={`inv-${i}`} onClick={() => handleItemClick(item)}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Inventory;