import React from 'react';
import cities from './data/cities.json';
import { useState, useEffect } from 'react';

interface City {
    name: string;
    position: {
        lat: number;
        lng: number;
    }
}

interface CityListProps {
  score: number;
  isNextButtonEnabled: boolean;
}

const CityList = ({ score, isNextButtonEnabled }: CityListProps) => {
  const [round, setRound] = useState(parseInt(localStorage.getItem('round') ?? '1'));

  useEffect(() => {
    localStorage.setItem('score', score.toString());
    localStorage.setItem('round', round.toString());
  }, [score, round]);

  const currentCity = cities.cities[round - 1];

  const handleNextCity = () => {
    setRound(round + 1);
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
        <button onClick={handleNextCity} disabled={!isNextButtonEnabled}>Next City</button>
      )}
    </div>
  );
};
      
export default CityList;