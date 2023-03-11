import React from 'react';
import cities from '../data/cities.json';
import { useEffect } from 'react';
import { City } from '../types/MapTypes';
import { isNextGameAllowed } from '../RulesHelper';

interface RoundsProps {
  score: number;
  round: number;
  pinIsCorrect: boolean | null;
  updateToNextRound: (round: number, updatedCity: City) => void;
}

const Rounds = ({ score, round, updateToNextRound, pinIsCorrect }: RoundsProps) => {

  const currentCity = cities.cities[round-1];

  useEffect(() => {
    localStorage.setItem('score', score.toString());
    localStorage.setItem('round', round.toString());
  }, [score, round]);

  const handleNextCity = () => {
    updateToNextRound(round + 1, cities.cities[round + 1]);
  };
  
  return (
    <div>
      <div className='information'>
      <h3 className='information__round'>Round {round}</h3>
      <h3 className='information__score'>Current Score: {score}</h3>
      </div>
      <div className='instructions'>
      <p>Use the pin provided and drag & drop to: <i>{currentCity.name}</i></p>
      {round < cities.cities.length && pinIsCorrect && isNextGameAllowed(score, round) && (
        <div className='nextround'>
          <button className='btn__nextround' onClick={handleNextCity} disabled={!isNextGameAllowed(score, round)}>Next Round</button>
          </div>
      )}
      </div>
    </div>
  );
};
      
export default Rounds;