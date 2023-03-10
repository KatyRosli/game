import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
  
const Rules: React.FC = () => {
  const navigate = useNavigate()
  const [tournamentStarted, setTournamentStarted] = useState(false);

  useEffect(() => {
    const tournamentStartedFromStorage = localStorage.getItem('tournamentStarted');
    setTournamentStarted(tournamentStartedFromStorage ? JSON.parse(tournamentStartedFromStorage) : false);

    if (tournamentStarted) {
      navigate("/tournament")
    }
}, [navigate, tournamentStarted]);

  // Toggle showMap and showRules states and update local storage value
  const startTournament = () => {
    setTournamentStarted(true);
    localStorage.setItem('tournamentStarted', JSON.stringify(true));
    navigate("/tournament")
  }

  return (
    <div>
      <h1>Rules</h1>
      <p>These are the rules of the game:</p>
      <ul> How to play?
          <li>Step 1: You will see an interactive map.</li>
          <li>Step 2: You will get a city name.</li> 
          <li>Step 3: Guess where the city is located on the map.</li>   
          <li>Step 4: Use the pin to drag and drop on the map to guess.</li>    
          <li>Step 5: Once you're satisfied, hit the button submit.</li>   
      </ul>

      <ul>Rules:
          <li>There are a total of 9 rounds means 9 city names to guess!</li>
          <li>You will begin with 1500 as a starting score.</li>   
          <li>We will take the difference of your pin location to the actual city location to deduct your score.</li>    
          <li>Eg: Your pin are 20km away from the actual city location, 1500 - 20 = your updated score: 1480.</li>   
          <li>If your score reaches 0 before completing the 9 rounds, you lose.</li>    
          <li>If you manage to complete the 9 rounds congratulations you're the winner!</li>
      </ul>
      <p>Ready to play?</p>
      <button onClick={startTournament}>Ready!</button>
    </div>
  );
};

export default Rules;
