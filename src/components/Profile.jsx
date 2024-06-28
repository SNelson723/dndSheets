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
                <label style={{textDecoration: 'underline'}}>{upperCaseFirstChar(label[0])}: </label>
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
              <p className="text-center px-2">1</p>
              <label>Inspiration</label>
            </div>
          </div>
        </Container>
      </div>

      <div id="profileBody" className="mt-3 mx-auto card" style={{display: 'flex', justifyContent: 'center', width: '80vw', borderRadius: '10px'}}>
        <div id="body" className='mx-auto pr-3' style={{width: '100%', display: 'flex', borderRadius: '6px'}}>
            {/* This is where stats and proficiencies will be held */}
          <BaseStatsTable abilities={abilities} />
          <ProficiencyColumn abilities={abilities} />
          <div className="my-3 me-3">
            <div id="hitPoints">
              <p className='title text-center' style={{marginBottom: '1rem'}}>Hit Points</p>
              <p className='ms-1' style={{color: 'grey', marginTop: '-1rem', marginBottom: '0.5rem'}}>Hit Point Maximum<span className='ms-2' style={{textDecoration: 'underline'}}>12</span></p>
              <p className='ms-1' style={{color: 'grey'}}>Current Hit Points<span className='ms-2' style={{textDecoration: 'underline'}}>12</span></p>
            </div>
          </div>

          <div id="spellsKnown" className="my-3 me-3">

            <div id="userCantrips">
              <h6>Cantrips</h6>
              <table id="cantripsTable">
                <tbody>
                  {/* map cantrips as tr => td */}
                </tbody>
              </table>
            </div>

            <div id="userSpells">
              <h6>Spells</h6>
              <div id="firstLvl">
                <p style={{fontWeight: 'bolder'}}>1st-level spells</p>
                <table id="spellsTable">

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Maybe this is where skills and spells can be put and I can use a modal to popup with the required information! */}
    </div>
  );
};

export default Profile;