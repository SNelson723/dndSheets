import React from 'react';
import { Stack, Container } from 'react-bootstrap';
import BaseStatsTable from './profileComponents/BaseStatsTable';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const baseStats = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
  const [character, setCharacter] = useState({});

  useEffect(() => {
    axios.get('/user/3')
      .then(({data}) => console.log(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className='profile text-white'>
      <h1 className="text-center">My profile!</h1>
      <div className="container-fluid header" style={{width: '50%', textAlign: 'center'}}>
        <Container id="playerNav" style={{width: '100%'}}>
          {/* move this table into its own component and update with database */}
          <BaseStatsTable />
        </Container>
      </div>
      <div id="profileBody" className="mt-5 mx-auto" style={{display: 'flex', justifyContent: 'center', width: '80vw'}}>
        <Stack direction="horizontal" gap="3" className="text-center" id="profile-sections">
          <div id="body-left" className='mx-auto pr-3 card text-white' style={{width: '40vw'}}>
            Left Side
            {/* This is where stats and proficiencies will be held */}
          </div>
          <div id="body-right" className='mx-auto pl-3 card text-white' style={{width: '40vw'}}>
            Right Side
            {/* This is where the gear, features will be held */}
          </div>
        </Stack>
      </div>
      {/* Maybe this is where skills and spells can be put and I can use a modal to popup with the required information! */}
    </div>
  );
};

export default Profile;