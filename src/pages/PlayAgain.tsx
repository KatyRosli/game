import React from 'react';
import citiesJson from '../data/cities.json'

interface PlayAgainProps {
    correctCityList: string[];
}

const PlayAgain = ({ correctCityList }: PlayAgainProps) => {

    const resultFeedback = () => {
        if (correctCityList.length === 0) {
            return <p>You didn't guess any of the cities correctly</p>
        } else if (correctCityList.length !== citiesJson.cities.length) {
            return <>
                <p>
                    Congrats! Here are the cities you have guesssed correctly:
                    { correctCityList.map(city => <li>city</li>) }
                </p>
            </>
        }
    }

    return (
        <>
        <p>Display final score</p>
        <p>Display all correct cities</p>
        {correctCityList.length}
        <button>Play Again</button>
        </>
    );
}

export default PlayAgain;