import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

/**
 * You can use https://www.dnd5eapi.co/api/equipment/spellbook for the spell book
 * or any other piece of equipment the api has info on. Maybe try to get the info
 * via axios then if there is data brought back, make it a link that will open up a modal
 * to display that information?
 */

const Inventory = ({ inv }) => {
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [infoType, setInfoType] = useState('');
  // // Modify this to weapons specifically and make another one for regular inventory
  const [weaponDetails, setWeaponDetails] = useState({
    equipment_category: '',
    name: '',
    damage_dice: '',
    damage_type: '',
    range: ''
  });

  useEffect(() => {
    setInventory(inv.split(', ').map(item => item.toLowerCase()));
  }, []);

    const handleClose = () => setShowModal(false);
    const handleOpen = () => setShowModal(true);

  const handleItemClick = (item) => {
    // Make the api call to get the data then open the modal
    const param = item.split(' ').join('-');

    axios.get(`https://www.dnd5eapi.co/api/equipment/${param}`)
      .then(({ data }) => {
        console.log(data);
        // If looking at a weapon
        if (data.equipment_category.index === 'weapon') {
          setWeaponDetails({
            equipment_category: data.category_range,
            name: data.name,
            damage_dice: data.damage.damage_dice,
            damage_type: data.damage.damage_type.index,
            range: data.range.normal
          });
          setInfoType('weapon');

          // If looking at Adventuring gear
        } else if (data.equipment_category.index === 'adventuring-gear') {
          console.log('howdy')
        }
      })
      .catch(err => console.error(err));

      handleOpen();
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleClose} centered size="lg" aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title>{weaponDetails.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Type: {weaponDetails.equipment_category}</p>
            <p>Damage: {weaponDetails.damage_dice} {weaponDetails.damage_type} damage</p>
            <p>Range: {weaponDetails.range}</p>
        </Modal.Body>
      </Modal>
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