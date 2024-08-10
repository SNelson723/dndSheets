import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const Inventory = ({ inv, userId }) => {
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [infoType, setInfoType] = useState('');
  const [item, setItem] = useState('');
  const [grabbedItems, setGrabbedItems] = useState([]);
  const [weaponDetails, setWeaponDetails] = useState({
    equipment_category: '',
    name: '',
    damage_dice: '',
    damage_type: '',
    range: ''
  });
  const [itemDetails, setItemDetails] = useState({
    name: '',
    desc: '',
    category: '',
  });
  const [contents, setContents] = useState([]);

  useEffect(() => {
    setInventory(inv.split(', ').map(item => item.toLowerCase()));
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setItemDetails({
      name: '',
      desc: '',
      category: '',
    });
    setWeaponDetails({
      equipment_category: '',
      name: '',
      damage_dice: '',
      damage_type: '',
      range: ''
    });
  };
  const handleOpen = () => setShowModal(true);

  const handleItemClick = (item) => {
    // Make the api call to get the data then open the modal
    const param = item.split(' ').join('-').replace("'", '');

    axios.get(`https://www.dnd5eapi.co/api/equipment/${param}`)
      .then(({ data }) => {
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
          setItemDetails({
            name: data.name,
            desc: data.desc.flat(),
            category: data.equipment_category.name
          });

          // If the Adventuring gear has contents, like a pack of some sort
          if (data.contents.length > 0) {
            setContents(data.contents);
          }
          setInfoType('Adventuring Gear');
        }
      })
      .catch(err => {
        // get the info from the table
      });
      handleOpen();
  };

  // adds to the inventory
  const handleAddClick = (item) => {
    axios.patch(`/user/inventory/${userId}`, {inventory: item, update: 'add'})
      .then(({ data }) => {
        setItem('');
        setInventory(data.split(', ').map(item => item.toLowerCase()));
      })
      .catch(err => console.error(err));
  };

  // grabs items
  const grabbingItem = (item) => {
    // grab the input
    const checked = document.getElementById(item).checked;

    // if the input is checked => it won't be in the array so push
    if (checked) {
      setGrabbedItems((prevState) => [...prevState, item]);

      // else if checked  false => it's already in the array so filter it out
    } else {
      let filtered = grabbedItems.filter(str => str !== item);
      setGrabbedItems(filtered);
    }
  };

  // removes the selected items in Inventory
  const handleDeleteClick = () => {
    // filter out the grabbed Items from the inventory array => separate var
    const updatedInventory = inventory.filter(item => grabbedItems.indexOf(item) === -1).join(', ');

    // make the call and send back the newly updated list => update inventory state variable
    axios.patch(`/user/inventory/${userId}`, {inventory: updatedInventory, update: 'remove'})
    .then(({ data }) => setInventory(data.split(', ')))
    .catch(err => console.error(err));
  };

  return (
    <div>
      <Modal show={showModal} onHide={handleClose} centered aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title>{infoType === 'weapon' ? weaponDetails.name : itemDetails.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {infoType === 'weapon' ?
            <>
              <p>Type: {weaponDetails.equipment_category}</p>
              <p>Damage: {weaponDetails.damage_dice} {weaponDetails.damage_type} damage</p>
              <p>Range: {weaponDetails.range} feet</p>
            </> : null}
            {infoType === 'Adventuring Gear' ?
            <>
              <p>Type: {itemDetails.category}</p>
              <p>{itemDetails.desc}</p>
              <ul>
                {/* Maybe add a plus/minus box next to the items so the player can keep count of these items */}
                {contents.map((item, i) => <li key={`content_${i}`}>{item.quantity} - {item.item.name}</li>)}
              </ul>
            </> : null}
        </Modal.Body>
      </Modal>
      <div>
        <h3 style={{textAlign: 'center'}}>Inventory</h3>
      </div>
      <div className='mt-1'>
        <ul style={{overflowY: 'auto', maxHeight: '70%'}}>
          {inventory.map((item, i) => {
            return (
              <li key={`inv-${i}`}>
                <input className="me-2" onClick={() => grabbingItem(item)} id={item} type='checkbox' />
                <label onClick={() => handleItemClick(item)} htmlFor={item}>{item}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <input type='text' value={item} onChange={(e) => setItem(e.target.value)} />
      <div>
        <Button variant='primary' onClick={() =>handleAddClick(item)}>Add</Button>
        <Button variant='danger' onClick={handleDeleteClick}>Delete</Button>
      </div>
    </div>
  );
};

export default Inventory;