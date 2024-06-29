import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const Wizard = ({userId}) => {
  const [cantrips, setCantrips] = useState([]);
  const [spells, setSpells] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
    <div id="spellsKnown" className="my-3 me-3 ps-2">

      <div id="userCantrips" className="mt-1">
        <h6>Cantrips</h6>
        <table id="cantripsTable">
          <tbody>
            {/* map cantrips as tr => td */}
            {level === 1 ?
                <tr>
                  {cantrips.map(cantrip => <td key={cantrip} style={{width: 'auto'}} className='text-center'>{cantrip} |</td>)}
                </tr>
              : null}
          </tbody>
        </table>
      </div>

      <div id="userSpells" className="mt-3">
        <h6>Spells</h6>
        <div id="firstLvl">

          <table id="spellsTable">
            <tbody>
              {/* map spells as tr => td */}
              {level === 1 ?
                <tr>
                  <td style={{fontWeight: 'bolder'}}>1st level |</td>
                  {spells.map(spell => <td key={spell} style={{width: 'auto'}} className='text-center'> {spell} |</td>)}
                </tr>
                : null}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default Wizard;