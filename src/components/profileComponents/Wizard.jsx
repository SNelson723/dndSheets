import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const Wizard = ({userId}) => {
  const [cantrips, setCantrips] = useState([]);
  const [spells, setSpells] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentHover, setCurrentHover] = useState('');

  const level = 1;

  useEffect(() => {
    // Getting the cantrips by user's id
    axios.get(`cantrips/${userId}`)
      .then(({ data }) => setCantrips(Object.values(data)))
      .catch(err => console.error(err));

    axios.get(`userSpells/${userId}`)
      .then(({data}) => setSpells(Object.values(data)))
      .catch(err => console.error(err));
  }, []);

  const toggleModal = (query) => {
    // figure out how to pass in the spell or cantrip to get with axios from external api route
    // Use the show method on the modal to pass in the query term for the spells/cantrips
  };

  // add a modal for each cantrip/spell onclick event to use axios to access the
  // dnd 5e api and present all information about them

  // do the above => cantrips and spells now rendering => handle the modals

  return (
    <div id="charInfo" className="my-3 me-3 px-2">

      <div id="userCantrips" className="mt-1" style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <h6 onMouseEnter={() => setCurrentHover('Actions')} className={`${currentHover === 'Actions' && 'currentInfoHover'}`}>Actions</h6>
        <h6 onMouseEnter={() => setCurrentHover('Spells')}  className={`${currentHover === 'Spells' && 'currentInfoHover'}`}>Spells</h6>
        <h6 onMouseEnter={() => setCurrentHover('Inventory')}  className={`${currentHover === 'Inventory' && 'currentInfoHover'}`}>Inventory</h6>
        <h6 onMouseEnter={() => setCurrentHover('FeatsTraits')}  className={`${currentHover === 'FeatsTraits' && 'currentInfoHover'}`}>Feats/Traits</h6>
        <h6 onMouseEnter={() => setCurrentHover('Description')}  className={`${currentHover === 'Description' && 'currentInfoHover'}`}>Description</h6>
        <h6 onMouseEnter={() => setCurrentHover('Notes')}  className={`${currentHover === 'Notes' && 'currentInfoHover'}`}>Notes</h6>
      </div>
    </div>
  );
};

export default Wizard;