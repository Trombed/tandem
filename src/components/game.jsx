import React, {useState} from 'react';
import './style.css';
import Quiz from './quiz/quiz';
import GameOver from './gameover/gameover';
var array = require('../util/Apprentice_TandemFor400_Data.json')

const Game = () => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
   
    const restart = () => {
        setScore(0);
        setGameOver(false);
    }

    const addPoint = () => {
        setScore(score+1);
    }


    return (
        <div className="game_div">
            {
                gameOver ?
                <GameOver 
                    score={score} 
                    restart={restart}
                    maxScore={array.length}
                />
                :
                <Quiz 
                    addPoint={addPoint} 
                    setGameOver={setGameOver}
                    gameOver={gameOver}
                    array={array}
                   
                />
            }
        </div>
    )
};



export default Game;