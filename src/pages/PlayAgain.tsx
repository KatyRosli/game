import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatchContext } from '../context/MatchContext';
import citiesJson from '../data/cities.json'
import { ActionType } from '../reducers/MatchReducer';

const PlayAgain = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useMatchContext();

    const resultFeedback = () => {
        if (state.correctCityList?.length === 0) {
            return <p>😔 You didn't guess any of the cities correctly.</p>
        } else if (state.correctCityList?.length !== citiesJson.cities.length) {
            return <>
                <p>
                    🥳 Congrats! Here are the cities you have guesssed correctly:
                    { state.correctCityList.map((city: string) => <li className='correctCities' key={city}>{city}</li>) }
                </p>
            </>
        } else {
            return <p>🥳WoW! You have successfully gotten all cities correctly! 👏</p>
        }
    }

    const handleReset = () => {
        localStorage.removeItem('score')
        localStorage.removeItem('round')
        localStorage.removeItem('correctCityList')
        localStorage.removeItem('tournamentStarted')
        dispatch({ type: ActionType.SCORE, payload: 1500 });
        dispatch({ type: ActionType.ROUND, payload: 1 });
        dispatch({ type: ActionType.CURRENT_CITY, payload: citiesJson.cities[0] });
        dispatch({ type: ActionType.CORRECT_CITY_LIST, payload: [] });
        dispatch({ type: ActionType.PIN_IS_CORRECT, payload: null });
        dispatch({ type: ActionType.PIN_POSITION, payload: {} });
        dispatch({ type: ActionType.TOURNAMENT_STARTED, payload: false });
        navigate("/");
    }

    return (
        <aside className='final'>
        <h2>You have come to the end of the game!</h2>
        <p>Display final score: { state.score }</p>
        {resultFeedback()}
        <p>Play again and beat your current score!</p>
        <button className='btn__playAgain'onClick={handleReset}>Play Again</button>
        </aside>
    );
}

export default PlayAgain;