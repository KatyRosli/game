import React from 'react';
import { useLocation } from 'react-router-dom';
import citiesJson from '../data/cities.json'

interface PlayAgainProps {
    resetCallback: () => void;
}

const PlayAgain = ({ resetCallback }: PlayAgainProps) => {
    const { state } = useLocation();
    const result = JSON.parse(state).result;

    const resultFeedback = () => {
        //console.log('correctcitylist: ', result)
        if (result?.length === 0) {
            return <p>😔 You didn't guess any of the cities correctly.</p>
        } else if (result?.length !== citiesJson.cities.length) {
            return <>
                <p>
                    🥳 Congrats! Here are the cities you have guesssed correctly:
                    { result.map((city: string) => <li className='correctCities' key={city}>{city}</li>) }
                </p>
            </>
        } else {
            return <p>🥳WoW! You have successfully gotten all cities correctly! 👏</p>
        }
    }

    const handleReset = () => {
        resetCallback()
    }

    return (
        <aside className='final'>
        <h2>You have come to the end of the game!</h2>
        <p>Display final score</p>
        {resultFeedback()}
        <p>Play again and beat your current score!</p>
        <button className='btn__playAgain'onClick={handleReset}>Play Again</button>
        </aside>
    );
}

export default PlayAgain;