import React from 'react';
import cities from './data/cities.json';
import { useState } from 'react';

interface Cities {
  cities: {
    name: string;
    position: {
        lat: number;
        lng: number;
    }
  }[];
}

interface CityListProps {
  score: number;
}

const CityList = ({ score }: CityListProps) => {
  const [round, setRound] = useState(1);

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
              <button onClick={handleNextCity}>Next City</button>
            )}
          </div>
        );
      };
      
      export default CityList;