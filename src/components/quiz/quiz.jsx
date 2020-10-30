import React, {useState, useEffect} from 'react'
import './style.css'
var data = require('../../util/Apprentice_TandemFor400_Data.json')


const Quiz = ({addPoint, setGameOver, setTotal}) => {
    const [curNum, setNum] = useState(0);
    const [answer, setAnswer] = useState([]);
    setTotal(data.length)

   
    useEffect( ()=> {
        if (curNum >= data.length) {
            setGameOver()
            setNum(0)
            return;
        };
   
        // setAnimation(false)
        randomize();
    }, [curNum])
    
    let renderAns = answer.map( (el,idx) => {
        return (
                <div onClick={ e => submitAnswer(e)}
                className={`answer_button`}
        
                key={idx}
                data-answer={el}
                >  
                {idx+1})  {el}
                </div>
        )
    })

    //randomize answers array
    const randomize = () => {
        let result = [data[curNum].correct, ...data[curNum].incorrect]
        for (let i = result.length-1; i >= 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            
            [result[i], result[j]] = [result[j], result[i]]
        }
        setAnswer(result)
    }

    // const submitAnswer = async = (e) => {
    async function submitAnswer(e) {
        let result = (e.target.dataset.answer === data[curNum].correct) 
        if (result) {
            renderCorrect("correct")
            e.target.classList.add("correct_answer")
            e.target.onanimationend = () => {
                e.target.classList.remove("correct_answer")
                setNum(curNum+1)
            }
            addPoint();
        } else {
            let correct = showCorrect()
            renderCorrect("incorrect")
            correct.classList.add("correct_answer")
            e.target.classList.add("incorrect_answer");
            e.target.onanimationend = () => {
                correct.classList.remove("correct_answer")
                e.target.classList.remove("incorrect_answer")
                setNum(curNum+1)
            }
        }
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
        }
    }


    const field = () => {
        return (
            <div className="quiz_container_2">
                <div className="quiz_question">
                    <div className="show_correct">
                        
                    </div>

                    <div className="show_incorrect">
                        X
                    </div>
                    {data[curNum].question}
                </div>
                <div className="answer_container">

                    <div className="quiz_answer">
                        {renderAns.map( (el,idx) => {
                            if (idx % 2 === 0) return el
                        })}
                    </div>
                    <div className="quiz_answer">
                        {renderAns.map( (el,idx) => {
                            if (idx % 2 !== 0) return el
                        })}
                    </div>
                </div>
               
            </div>
        )
    }

    return (
        <div className="quiz_container_1">
            {curNum < data.length ? field() : null}
    
            <div className="question_number">
                     Question #{curNum+1}
            </div>
        </div>
    )
}





export default Quiz