import React, {useState, useEffect} from 'react';
import './style.css';
import Quiz from './quiz/quiz';
import GameOver from './gameover/gameover';
var importData = require('../util/Apprentice_TandemFor400_Data.json')

const Game = () => {
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const [curNum, setNum] = useState(0)
    const numQuest = 10 //set number of questions to quiz
    

    // on mount randomize 10 questions from json file
    useEffect( () => {
        loadData()
    }, [])

    // if gameOver is false reload questions
    useEffect( () => {
        if (gameOver) return;
        else {
            loadData()
        }
    },[gameOver])

    const loadData = () => {
        for (let i = importData.length-1; i >= 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            [importData[i], importData[j]] = [importData[j], importData[i]]
        }
        let randomQuest = importData.slice(0,numQuest)
        setData(randomQuest)
        setLoad(load => true)
    }
    
    const restart = () => {
        setNum(0)
        setGameOver(false);
        setScore(0);
    }

    const addPoint = () => {
        setScore(score+1);
    }

    const nextQuestion = () => {
        if (curNum >= numQuest) {
            setGameOver(false)
        }
        else {
            setNum(curNum => curNum+1)
        }
    }


    return (
        <div className="game_div">
            {
            !load ? "Loadiccççng Question" : 
                gameOver ?
                <GameOver 
                    score={score} 
                    restart={restart}
                    maxScore={numQuest}
                />
                :
                <Quiz 
                    addPoint={addPoint} 
                    setGameOver={setGameOver}
                    gameOver={gameOver}
                    data={data}
                    setData={setData}
                    curNum={curNum}
                    setNum={nextQuestion}
                    numQuest={numQuest}
                />
            }
        </div>
    )
};



export default Game;