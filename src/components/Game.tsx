import React from 'react';

interface Props {
    roundNumber: number;
}
    const Game: React.FC<Props> = ({ roundNumber }) => {
        return (
            <div>
                <h2> Round {roundNumber} </h2>
                <p> Game in progress...</p>
            </div>
        );
    };

export default Game;
