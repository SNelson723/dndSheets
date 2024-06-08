import React from "react";
import { setProficiencyMod } from "../../modifierFunctions";

const ProficiencyColumn = ({ level }) => {
  return (
    <div>
      <div style={{display: 'flex'}}>
        <p className="text-center pr-2">{setProficiencyMod(level)}</p>
        <label>Proficiency Bonus</label>
      </div>
    </div>
  );
}

export default ProficiencyColumn;