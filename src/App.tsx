import React from 'react';
import Map from './components/Map';
import CityList from './components/CityList';

const App = () => {
  return (
    <>
      <Map />
      <CityList score={0} />
    </>
  );
};

export default App;
