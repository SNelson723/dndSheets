import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const Inventory = ({ inv, userId }) => {
  const [inventory, setInventory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [infoType, setInfoType] = useState('');
  const [item, setItem] = useState('');
  const [grabbedItems, setGrabbedItems] = useState('');
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

  const handleAddClick = (item) => {
    const fixedItem = item.trim().split(' ').join('-').toLowerCase();
    axios.get(`https://www.dnd5eapi.co/api/equipment/${item}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {
        // if no data, that should be fine
      });
    axios.patch(`/user/inventory/${userId}`, {inventory: item})
      .then(({ data }) => setInventory(data.split(', ').map(item => item.toLowerCase())))
      .catch(err => console.error(err));
  };

  const grabbingItem = (item) => {
    // if not in the grabbed items
    const isChecked = document.getElementById(item).checked;

    // when checked the first time => it is checked
    if (isChecked) {
      setGrabbedItems((prevState) => [...prevState, item])
    } else {
      // This is the second click that will make checked === false
      let filtered = grabbedItems.filter(str => str !== item);
      setGrabbedItems(filtered);
    }
  };

  const handleDeleteClick = () => {
    console.log('Delete');
    axios.delete()
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