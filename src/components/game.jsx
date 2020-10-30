import React, {useState} from 'react';
import './style.css';
import Quiz from './quiz/quiz';
import GameOver from './gameover/gameover'

const Game = () => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false)
    const [totalQuestion, setTotal] = useState(0)

    const restart = () => {
        setScore(0)
        setGameOver(false)
    }

    const addPoint = () => {
        setScore(score+1)
    }

    const showGameOver = () => {
      setGameOver(true)
    }

    return (
        <div className="game_div">

            {
                gameOver ?
                <GameOver 
                    score={score} 
                    restart={restart}
                    total={totalQuestion}
                />
                :
                <Quiz 
                    addPoint={addPoint} 
                    setGameOver={showGameOver}
                    setTotal={setTotal}
                />
            }
        </div>
    )
}



export default Game