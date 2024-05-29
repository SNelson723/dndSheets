import React from 'react';

const BaseStatsMap = ({ stat }) => {
  // handle the stat modifiers here when mapping
  return (
    <div className="text-center m-3">
      <tr>
        <td>{stat}</td>
      </tr>
      <tr>
        <td>+3</td>
      </tr>
    </div>
  )
};

export default BaseStatsMap;