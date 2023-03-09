import React from 'react';
import Map from './components/Map';
import Game from './components/Game';

const App = () => {
  return (
    <>
      <Map />
      <Game roundNumber={1}/>
    </>
  );
};

export default App;
