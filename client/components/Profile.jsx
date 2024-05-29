import React from 'react';
import { Container } from 'react-bootstrap';
import BaseStatsMap from './profileComponents/BaseStatsMap';

const Profile = () => {
  const baseStats = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'];
  return (
    <div className='card'>
      <h1 className="text-center">My profile!</h1>
      <div className="container-fluid" style={{width: '50%', textAlign: 'center'}}>
        <Container id="playerNav" style={{width: '100%'}}>
          <table style={{display: 'flex', justifyContent: 'center', width: 'auto'}}>
            {baseStats.map(stat => <BaseStatsMap stat={stat} />)}
          </table>
        </Container>
      </div>
      <div className="card-body" style={{display: 'inline-flex'}}>
        <div className='mx-auto' style={{border: '2px solid black'}}>
          Left Side
        </div>
        <div className='mx-auto' style={{border: '2px solid blue'}}>
          Right Side
        </div>
      </div>
    </div>
  );
};

export default Profile;