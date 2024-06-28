import React,  { useState, useEffect } from 'react';
import axios from 'axios';

const Wizard = ({userId}) => {
  const [cantrips, setCantrips] = useState([]);
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    axios.get(`cantrips/${userId}`)
      .then(({ data }) => setCantrips(Object.values(data)))
      .catch(err => console.error(err));
  }, []);

  // add a modal for each cantrip/spell onclick event to use axios to access the
  // dnd 5e api and present all information about them

  return (
    <div id="spellsKnown" className="my-3 me-3">

      <div id="userCantrips">
        <h6>Cantrips</h6>
        <table id="cantripsTable">
          <tbody>
            {/* map cantrips as tr => td */}
            {userId === 1 ?
                <tr>
                  {cantrips.map(cantrip => <td key={cantrip} className="mx-4 text-center">{cantrip}</td>)}
                </tr>
              : null}
          </tbody>
        </table>
      </div>

      <div id="userSpells">
        <h6>Spells</h6>
        <div id="firstLvl">
          <p style={{fontWeight: 'bolder'}}>1st-level spells</p>
          <table id="spellsTable">
            {/* map spells as tr => td */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wizard;