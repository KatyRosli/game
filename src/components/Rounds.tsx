import cities from '../data/cities.json';
import { useEffect } from 'react';
import { isNextGameAllowed } from '../RulesHelper';
import { useMatchContext } from '../context/MatchContext';
import { ActionType } from '../reducers/MatchReducer';

const Rounds = () => {
  const { state, dispatch } = useMatchContext();

  useEffect(() => {
    localStorage.setItem('score', state.score.toString());
    localStorage.setItem('round', state.round.toString());
  }, [state.score, state.round]);

  const handleNextCity = () => {
    dispatch({
      type: ActionType.ROUND,
      payload: state.round + 1
    });
    dispatch({
      type: ActionType.CURRENT_CITY,
      payload: cities.cities[state.round]
    });
    dispatch({
      type: ActionType.PIN_IS_CORRECT,
      payload: null
    });
  };
  
  return (
    <div>
      <div className='information'>
      <h3 className='information__round'>Round {state.round}</h3>
      <h3 className='information__score'>Current Score: {state.score}</h3>
      </div>
      <div className='instructions'>
      <p>Use the pin provided and drag & drop to: <i>{state.currentCity.name}</i></p>
      {state.round < cities.cities.length && state.pinIsCorrect && isNextGameAllowed(state.score, state.round) && (
        <div className='nextround'>
          <button className='btn__nextround' onClick={handleNextCity} disabled={!isNextGameAllowed(state.score, state.round)}>Next Round</button>
          </div>
      )}
      </div>
    </div>
  );
};
      
export default Rounds;