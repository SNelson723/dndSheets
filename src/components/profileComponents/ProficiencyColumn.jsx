import React, { useState, useEffect } from "react";
import { setProficiencyMod } from "../../modifierFunctions";

const ProficiencyColumn = ({ level }) => {
  const [profBonus, setProfBonus] = useState('');

  useEffect(() => {
    setProfBonus(setProficiencyMod(level))
  });

  return (
    <div>
      <div style={{display: 'flex'}}>
        <p className="text-center pr-2">{profBonus}</p>
        <label>Proficiency Bonus</label>
      </div>
    </div>
  );
}

export default ProficiencyColumn;