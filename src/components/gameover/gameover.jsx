import React from 'react';
import './style.css'
const GameOver = ({score, restart}) => {
    return (
        <div className="game_over">
            Game Over 
            {score}
            <div onClick={restart}>

            Try Again?
            </div>
        </div>
    );
};

export default GameOver;