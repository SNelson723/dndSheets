import React from 'react';
import { Stack, Container } from 'react-bootstrap';
import BaseStatsMap from './profileComponents/BaseStatsMap';

const Profile = () => {
  const baseStats = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
  return (
    <div className='profile text-white'>
      <h1 className="text-center">My profile!</h1>
      <div className="container-fluid header" style={{width: '50%', textAlign: 'center'}}>
        <Container id="playerNav" style={{width: '100%'}}>
          <table style={{display: 'flex', justifyContent: 'center', width: 'auto'}}>
            {baseStats.map(stat => <BaseStatsMap stat={stat} />)}
          </table>
        </Container>
      </div>
      <div id="profileBody" className="mt-5 mx-auto" style={{display: 'flex', justifyContent: 'center', width: '80vw'}}>
        <Stack direction="horizontal" gap="3" className="text-center" id="profile-sections">
          <div id="body-left" className='mx-auto pr-3 card text-white' style={{width: '40vw'}}>
            Left Side
          </div>
          <div id="body-right" className='mx-auto pl-3 card text-white' style={{width: '40vw'}}>
            Right Side
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default Profile;