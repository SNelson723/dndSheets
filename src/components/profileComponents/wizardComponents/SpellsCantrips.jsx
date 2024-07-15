import React, {useEffect, useState} from 'react';
import axios from 'axios';

const SpellsCantrips = ({ userId }) => {
  const [cantrips, setCantrips] = useState([]);
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    // Getting the cantrips by user's id
    axios.get(`cantrips/${userId}`)
      .then(({ data }) => setCantrips(Object.values(data)))
      .catch(err => console.error(err));

    axios.get(`userSpells/${userId}`)
      .then(({data}) => setSpells(Object.values(data)))
      .catch(err => console.error(err));
  }, []);

  console.log('Cantrips', cantrips);
  console.log('Spells', spells);
  return (
    <div id="spellsBody">
      Spells and Cantrips
    </div>
  );
};

export default SpellsCantrips;