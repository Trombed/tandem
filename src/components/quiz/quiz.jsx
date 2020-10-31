import React, {useState, useEffect} from 'react';
import './style.css';
// var array = require('../../util/Apprentice_TandemFor400_Data.json');


const Quiz = ({addPoint, setGameOver, array}) => {
    const [curNum, setNum] = useState(1);
    const [answer, setAnswer] = useState([]);
    const [data, setData] = useState(array);
    const [animating, setAnimating] = useState(false)


    useEffect( ()=> {

        if (!data.length) return setGameOver(true)
        //randomize answer array
        let result = [data[0].correct, ...data[0].incorrect]
        for (let i = result.length-1; i >= 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            [result[i], result[j]] = [result[j], result[i]]
        }
   

        setAnswer(result)
    }, [data])
    
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



    // const submitAnswer = async = (e) => {
    async function submitAnswer(e, index) {
   
        if (animating) return;
        setAnimating(true)
        let result = (e.target.dataset.answer === data[0].correct)
        if (result) {
            renderCorrect("correct")
            e.target.classList.add("correct_answer")
            e.target.onanimationend = () => {
                e.target.classList.remove("correct_answer")
                setData(data.filter( (el, idx) => idx !== 0))
                addPoint();
            }
        } else {
            let correct = showCorrect()
            renderCorrect("incorrect")
            correct.classList.add("correct_answer")
            e.target.classList.add("incorrect_answer");
            e.target.onanimationend = () => {
                correct.classList.remove("correct_answer")
                e.target.classList.remove("incorrect_answer")
                
                setNum(curNum+1)
                setData(data.filter( (el, idx) => idx !== 0))
            }
        }
        setNum(curNum+1)
    }

    const showCorrect = () => {
        let ans = document.getElementsByClassName("answer_button")
        for (let i = 0; i < ans.length; i++) {
            if (ans[i].dataset.answer === data[0].correct) {
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
                    {data[0].question}
                </div>
                <div className="answer_container">
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
    }

    return (
        <div className="quiz_container_1">
            {data.length ? field() : null}
    
            <div className="question_number">
                     Question #{curNum}
            </div>
        </div>
    )
};





export default Quiz