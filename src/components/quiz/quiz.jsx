import React, {useState, useEffect, useCallback} from 'react';
import './style.css';
import QuestionNumber from './questionNumber/questionNumber'

const Quiz = ({addPoint, setGameOver, data, setData, curNum, setNum, numQuest}) => {
    const [correctSound] = useState(new Audio('/correct.mp3'))
    const [incorrectSound] = useState(new Audio('/wrong.mp3'))
    const [answer, setAnswer] = useState([]);
    const [animating, setAnimating] = useState(false);
    const [muted, setMuted] = useState(false)

    correctSound.volume = 0.2
    incorrectSound.volume = 0.2


    // randomize answer array or exit if game should not be started
    const randomize = useCallback(() => {
        if (curNum >= numQuest) return setGameOver(true);
        if (!data.length) return;
        let result = [data[curNum].correct, ...data[curNum].incorrect];
        for (let i = result.length-1; i >= 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            [result[i], result[j]] = [result[j], result[i]]
        };
        setAnswer(result);
    }, [curNum, data, numQuest, setGameOver]);

    useEffect( () => {
        randomize()
    }, [randomize]);

    // mapping of answer array while setting dataset for each answer
    let renderAns = answer.map( (el,idx) => {
        return (
            <div onClick={ e => submitAnswer(e.target)}
                className={`answer_button`} 
                key={idx}
                data-answer={el}
            >  
                    {el}
            </div>
        )
    });

    const toggleMute = () => {
        setMuted(!muted)
        console.log(muted)
    }


    const submitAnswer = (e) => {
        // if animation is running user should not be able to click;
        if (animating) return;
        // set animation to true;
        setAnimating(true);
        let result = (e.dataset.answer === data[curNum].correct);
        if (result) {
            renderCorrect("correct")
            e.classList.add("correct_answer")
            if (!muted) {correctSound.play()};
            setTimeout(() => {
                setNum()
                resetAudio()
            }, 1250);
            e.onanimationend = () => {
                e.classList.remove("correct_answer")
                addPoint();
            }
        } 
        else {
            let correct = showCorrect()
            correct.classList.add("correct_answer")
            if (!muted) {incorrectSound.play()};
            renderCorrect("incorrect")
            e.classList.add("incorrect_answer");
            setTimeout(() => {
                setNum()
                resetAudio()
            }, 1250);
            e.onanimationend = () => {
                correct.classList.remove("correct_answer")
                e.classList.remove("incorrect_answer")
            }
        };    
    };

    //reset Audio in order to play again, audio length are also longer than animation times
    const resetAudio = () => {
        correctSound.currentTime = 0
        incorrectSound.currentTime = 0
        correctSound.pause() 
        incorrectSound.pause()
    }

    const showCorrect = () => {
        let ans = document.getElementsByClassName("answer_button")
        for (let i = 0; i < ans.length; i++) {
            if (ans[i].dataset.answer === data[curNum].correct) {
                return ans[i]
            }
        }
    }

    // render the "O" and "X" on question box after user clicks answer
    const renderCorrect = (str) => {
        let showCorrect = document.getElementsByClassName(`show_${str}`)[0]
        showCorrect.style.display = "block";
        showCorrect.onanimationend = () => {
            showCorrect.style.display = "none";
            setAnimating(false)
        }
    }


    const field = () => {
        return (
            <div className="quiz_container_2">
                <div className="quiz_question">
                    <div className="show_correct">
                      {/* using css to show circle */}
                    </div>
                    <div className="show_incorrect">
                        X
                    </div>
                    {data[curNum].question}
                </div>
                <div className="answer_container">
                    {/* generate two rows of answer boxes */}
                    <div className="quiz_answer">
                        {renderAns.map( (el,idx) => {
                            if (idx % 2 === 0) {return el}
                            else {return null}
                        })}
                    </div>
                    <div className="quiz_answer">
                        {renderAns.map( (el,idx) => {
                            if (idx % 2 !== 0) {return el}
                            else {return null}
                        })}
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className="quiz_container_1">
            {data[curNum] ? field() : null}
            <div className="question_number">
                {curNum < numQuest  ? <QuestionNumber number={curNum} 
                muted={muted}
                toggleMute={toggleMute}
                /> 
                : null }
            </div>
        </div>
    );
};

export default Quiz;