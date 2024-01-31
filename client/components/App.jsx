import React from 'react';
import { Route } from 'react-router-dom'
import Profile from './Profile';

const App = () => {
  return (
    <Route>
      <Route path="/protected/profile" element={<Profile />}>
      </Route>
    </Route>
  );
};

export default App;