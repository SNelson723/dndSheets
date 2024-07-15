import React,  { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import SpellsCantrips from './wizardComponents/SpellsCantrips';

const Wizard = ({userId}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentInfoTab, setCurrentInfoTab] = useState('Actions');

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
        <h6
          onClick={() => setCurrentInfoTab('Actions')}
          className={`subInfoHeader ${currentInfoTab === 'Actions' && 'currentInfoTab'}`}
        >
          Actions
        </h6>
        <h6
          onClick={() => setCurrentInfoTab('Spells')}
          className={`subInfoHeader ${currentInfoTab === 'Spells' && 'currentInfoTab'}`}
        >
          Spells
        </h6>
        <h6
        onClick={() => setCurrentInfoTab('Inventory')}
          className={`subInfoHeader ${currentInfoTab === 'Inventory' && 'currentInfoTab'}`}
        >
          Inventory
        </h6>
        <h6
        onClick={() => setCurrentInfoTab('FeatsTraits')}
          className={`subInfoHeader ${currentInfoTab === 'FeatsTraits' && 'currentInfoTab'}`}
        >
          Feats/Traits
        </h6>
        <h6
        onClick={() => setCurrentInfoTab('Description')}
          className={`subInfoHeader ${currentInfoTab === 'Description' && 'currentInfoTab'}`}
        >
          Description
        </h6>
        <h6
          onClick={() => setCurrentInfoTab('Notes')}
          className={`subInfoHeader ${currentInfoTab === 'Notes' && 'currentInfoTab'}`}
        >
          Notes
        </h6>
      </div>
      <div id="subInfoBody">
        {/* {currentInfoTab === 'Spells' ? <SpellsCantrips userId={userId} /> : null} */}
        <SpellsCantrips userId={userId} />
      </div>
    </div>
  );
};

export default Wizard;