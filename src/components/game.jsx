import React from 'react';
import './style.css';
import Quiz from './quiz/quiz';

const Game = () => {
    

    return (
        <div className="game_div">
            <button onClick={startGame()}>START</button>
            <Quiz />
        </div>
    )
}

const startGame = () => {

}


export default Game