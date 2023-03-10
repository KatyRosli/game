import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Rules from './components/Rules';

const App = () => {
  const [showMap, setShowMap] = useState(false);
  const [showRules, setShowRules] = useState(true);

  // Use effect to retrieve showRules value from local storage
  useEffect(() => {
    const showRulesFromStorage = localStorage.getItem('showRules');
    setShowRules(showRulesFromStorage ? JSON.parse(showRulesFromStorage) : true);

    const showMapFromStorage = localStorage.getItem('showMap');
    setShowMap(showMapFromStorage ? JSON.parse(showMapFromStorage) : false);
}, []);

  // Toggle showMap and showRules states and update local storage value
  const handleShowMap = () => {
    setShowMap(true);
    setShowRules(false);
    localStorage.setItem('showRules', JSON.stringify(false));
    localStorage.setItem('showMap', JSON.stringify(true));
  }

  return (
    <div>
          {/* Render Rules component only if showRules is true */}
          {showRules && (
            <>
              <Rules onShowMap={() => handleShowMap()} />
              <button onClick={handleShowMap}>Ready!</button>
              </>
          )}
          {/* Render Map component only if showMap is true */}
          {showMap && <Map />}
        </div>
  );
};

export default App;
