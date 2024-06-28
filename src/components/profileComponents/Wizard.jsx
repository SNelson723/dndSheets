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

  return (
    <div id="spellsKnown" className="my-3 me-3">

      <div id="userCantrips">
        <h6>Cantrips</h6>
        <table id="cantripsTable">
          <tbody>
            {/* map cantrips as tr => td */}
            {}
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