import React, { useState, useEffect } from "react";
import axios from 'axios';

const ProficiencyColumn = ({ level, abilities }) => {
  const [allSkills, setAllSkills] = useState([]);

  useEffect(() => {
    axios.get('/api/getSkills')
      .then(({data}) => setAllSkills(data))
      .catch(error => console.error(error));
  }, [])

  return (
    <div className="px-1">

      <div style={{display: 'flex'}}>

        {/* Set up saving throws */}
        <div className="my-3 me-3" style={{border: '1px solid black', borderRadius: '6px', height: '23vh', backgroundColor: 'azure'}}>
          <p className="text-center mt-1 title" style={{marginBottom: '1rem'}}>Saving Throws</p>
          {Object.entries(abilities).map(ability => (
            <div className="mx-2" key={`${ability[0]}_saving_throw`} style={{display: 'flex', justifyContent:'left', marginTop: '-1rem'}}>
              <label>+</label>
              <p className="text-center" style={{width: '1rem', paddingBottom: '0', textDecoration: 'underline'}}>3</p>
              <p style={{paddingBottom: '0'}}>{ability[0]}</p>
            </div>
          ))}
        </div>

        {/* Set up proficiencies */}
        <div className="my-3 me-3" style={{border: '1px solid black', borderRadius: '6px', backgroundColor: 'azure'}}>
          <p className="text-center mt-1 title" style={{marginBottom: '1rem'}}>Skills</p>
          {allSkills.map(skill => (
            <div className="mx-2" key={`${skill}_skill`} style={{display: 'flex', justifyContent:'left', marginTop: '-1rem'}}>
            <label>+</label>
            <p className="text-center" style={{textDecoration: 'underline', width: '1rem'}}>3</p>
            <p style={{paddingBottom: '0'}}>{skill}</p>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProficiencyColumn;