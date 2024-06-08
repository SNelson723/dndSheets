import React, { useState, useEffect } from "react";
import { setProficiencyMod, setModifiers } from "../../modifierFunctions";

const ProficiencyColumn = ({ level, abilities }) => {
  const bonus = setProficiencyMod(level);

  return (
    <div className="py-1 px-1" style={{width: '17vw'}}>
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
              <p className="text-center" style={{borderBottom: '2px solid black', width: '1rem'}}> 3</p>
              <p>{ability[0]}</p>
            </div>
          ))}
        </div>
        {/* Set up proficiencies */}
    </div>
  );
}

export default ProficiencyColumn;