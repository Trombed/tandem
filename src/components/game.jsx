import React, {useState} from 'react';
import './style.css';
import Quiz from './quiz/quiz';
import Splash from './splash/splash'
import GameOver from './gameover/gameover'

const Game = () => {
    const [quiz, setQuiz] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false)


    const restart = () => {
        setScore(0)
        setGameOver(false)
        setQuiz(true)
    }

    const addPoint = () => {
        setScore(score+1)
    }

    return (
        <div className="game_div">
            {
                gameOver ?  
                <GameOver 
                    score={score} 
                    restart={restart}
                /> : null
            }
            
            {
                !quiz ?
                <Splash setQuiz={setQuiz}/> 
                :
                <Quiz 
                    addPoint={addPoint} 
                    score={score}
                    setGameOver={setGameOver}
                />
            }
        </div>
    )
}



export default Game