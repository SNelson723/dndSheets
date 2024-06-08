import React, { useState, useEffect } from "react";
import { setProficiencyMod } from "../../modifierFunctions";

const ProficiencyColumn = ({ level }) => {
  const [profBonus, setProfBonus] = useState('');

  useEffect(() => {
    // setProfBonus(setProficiencyMod(level))
  }, []);

  return (
    <div className="py-1" style={{width: '18vw'}}>
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
        
        {/* Set up proficiencies */}
    </div>
  );
}

export default ProficiencyColumn;