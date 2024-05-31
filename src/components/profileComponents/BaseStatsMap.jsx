import React from 'react';

const BaseStatsMap = ({ stat }) => {
  // handle the stat modifiers here when mapping
  return (
    <div className="text-center m-3">
      <tr className="text-center m-3">
        <td>{stat}</td>
      </tr>
      <tr className="text-center m-3">
        <td>+3</td>
      </tr>
    </div>
  )
};

export default BaseStatsMap;