import React, { useState, useEffect } from "react";
import axios from 'axios';
import { setProficiencyMod, setModifiers } from "../../modifierFunctions";

const ProficiencyColumn = ({ level, abilities }) => {
  const bonus = setProficiencyMod(level);
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    axios.get('/api/getSkills')
      .then(({data}) => setAllSkills(data))
      .catch(error => console.error(error));
  }, [])

  return (
    <div className="py-1 px-1" style={{width: '13vw'}}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <p className="text-center px-2">{setProficiencyMod(level)}</p>
        <label>Proficiency Bonus</label>
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        {/* Set up inspiration */}
        <p className="text-center px-2">5</p>
        <label>Inspiration</label>
      </div>
        {/* Set up saving throws */}
        <div style={{border: '1px solid black', borderRadius: '6px'}}>
          {Object.entries(abilities).map(ability => (
            <div className="mx-2" key={`${ability[0]}_saving_throw`} style={{display: 'flex', justifyContent:'left'}}>
              <label>+</label>
              <p className="text-center" style={{borderBottom: '1px solid black', width: '1rem'}}>3</p>
              <p style={{paddingBottom: '0'}}>{ability[0]}</p>
            </div>
          ))}
          <p className="text-center my-1">Saving Throws</p>
        </div>
        {/* Set up proficiencies */}
        <div style={{border: '1px solid black', borderRadius: '6px'}}>
          {allSkills.map(skill => (
            <div className="mx-2" key={`${skill}_skill`} style={{display: 'flex', justifyContent:'left', marginTop: '-5px'}}>
            <label>+</label>
            <p className="text-center" style={{borderBottom: '1px solid black', width: '1rem'}}>3</p>
            <p style={{paddingBottom: '0'}}>{skill}</p>
          </div>
          ))}
          <p className="text-center my-1">Skills</p>
        </div>
    </div>
  );
}

export default ProficiencyColumn;