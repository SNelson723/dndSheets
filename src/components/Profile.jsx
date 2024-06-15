import React from 'react';
import { Stack, Container } from 'react-bootstrap';
import BaseStatsTable from './profileComponents/BaseStatsTable';
import { useState, useEffect } from 'react';
import ProficiencyColumn from './profileComponents/ProficiencyColumn';
import axios from 'axios';

const Profile = () => {
  const [character, setCharacter] = useState({});
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    // gonna need to change the 1 to the actual logged in user's id
    axios.get('/user/1')
      .then(({data}) => {
        console.log(data);
        setCharacter(data);
      })
      .catch(error => console.error(error));

      axios.get('/user/stats/1')
        .then(({ data }) => {
          console.log(data);
          setAbilities(data);
        })
        .catch(error => console.error(error));
  }, []);

  return (
    <div className='profile py-5'>
      <div className="container-fluid header" style={{width: '50vw', minWidth: '50vw', textAlign: 'center'}}>
        <Container id="playerNav">
          {/* move this table into its own component and update with database */}
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            {Object.entries(character).map((label, i) => (
              <div key={`Character-${label[0]}`} className='mx-4'>
                <label>{label[0]}: </label>
                <br/>
                {label[1]}
              </div>
            ))}
          </div>
        </Container>
      </div>
      <div id="profileBody" className="mt-5 mx-auto" style={{display: 'flex', justifyContent: 'center', width: '90vw', borderRadius: '10px'}}>
          <div id="body-left" className='mx-auto pr-3' style={{width: '100%', display: 'flex'}}>
            {/* This is where stats and proficiencies will be held */}
          <BaseStatsTable abilities={abilities} />
          <ProficiencyColumn abilities={abilities} level={character.level} />
          </div>
      </div>
      {/* Maybe this is where skills and spells can be put and I can use a modal to popup with the required information! */}
    </div>
  );
};

export default Profile;