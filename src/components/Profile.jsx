import React from 'react';
import { Stack, Container } from 'react-bootstrap';
import BaseStatsTable from './profileComponents/BaseStatsTable';
import { useState, useEffect } from 'react';
import ProficiencyColumn from './profileComponents/ProficiencyColumn';
import axios from 'axios';
import { upperCaseFirstChar, setProficiencyMod, setModifiers } from '../modifierFunctions';

const Profile = () => {
  const [character, setCharacter] = useState({});
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    // gonna need to change the 1 to the actual logged in user's id
    axios.get('/user/1')
      .then(({data}) => setCharacter(data))
      .catch(error => console.error(error));

      axios.get('/user/stats/1')
        .then(({ data }) => setAbilities(data))
        .catch(error => console.error(error));
  }, []);

  return (
    <div className='profile py-4'>
      <div className="container-fluid header" style={{width: '50vw', minWidth: '50vw', textAlign: 'center'}}>

        <Container id="playerNav">
          {/* move this table into its own component and update with database */}
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            {Object.entries(character).map((label, i) => (
              <div key={`Character-${label[0]}`} className='mx-4'>
                <label>{upperCaseFirstChar(label[0])}: </label>
                <br/>
                {label[1]}
              </div>
            ))}
          </div>
          <div style={{display: 'flex', marginTop: '0.5rem'}}>

            <div className='mx-auto' style={{display: 'flex', justifyContent: 'center'}}>
              <p className="text-center px-2">{setProficiencyMod(character.level)}</p>
              <label>Proficiency Bonus</label>
            </div>

            <div className='mx-auto' style={{display: 'flex', justifyContent: 'center'}}>
              <p className="text-center px-2">5</p>
              <label>Inspiration</label>
            </div>
          </div>
        </Container>
      </div>

      <div id="profileBody" className="mt-3 mx-auto" style={{display: 'flex', justifyContent: 'center', width: '80vw', borderRadius: '10px'}}>
          <div id="body-left" className='mx-auto pr-3' style={{width: '100%', display: 'flex'}}>
            {/* This is where stats and proficiencies will be held */}
          <BaseStatsTable abilities={abilities} />
          <ProficiencyColumn abilities={abilities} />
          </div>
      </div>

      {/* Maybe this is where skills and spells can be put and I can use a modal to popup with the required information! */}
    </div>
  );
};

export default Profile;