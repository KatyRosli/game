import React from 'react';
import cities from '../data/cities.json';
import { useEffect } from 'react';
import { City } from '../types/MapTypes';
import { isNextGameAllowed } from '../RulesHelper';

interface RoundsProps {
  score: number;
  round: number;
  updateRound: (round: number, updatedCity: City) => void;
}

const Rounds = ({ score, round, updateRound }: RoundsProps) => {

  const currentCity = cities.cities[round-1];

  useEffect(() => {
    localStorage.setItem('score', score.toString());
    localStorage.setItem('round', round.toString());
  }, [score, round]);

  const handleNextCity = () => {
    updateRound(round + 1, cities.cities[round + 1]);
  };
  
  return (
    <div>
      <h1>Drag & drop to:</h1>
      <ul>
        <li>{currentCity.name}</li>
      </ul>
      <h2>Round {round}</h2>
      <p>Score: {score}</p>
      {round < cities.cities.length && (
        <button onClick={handleNextCity} disabled={isNextGameAllowed(score, round)}>Next Round</button>
      )}
    </div>
  );
};
      
export default Rounds;