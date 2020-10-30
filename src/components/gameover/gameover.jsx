import React from 'react';
import './style.css'
const GameOver = ({score, restart, total}) => {

    return (
        <div className="game_over">
            <div className="game_over_heading">
                Game Over 
            </div>
            <div className="game_over_score">
                <div className="game_over_player">
                    {score}
                </div>/{total}
            </div>
            <div onClick={restart}
                className="game_over_button"
            >

                Try Again?
            </div>
        </div>
    );
};

export default GameOver;