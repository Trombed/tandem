import React, {useState, useEffect} from 'react'
import './style.css'
var data = require('../../util/Apprentice_TandemFor400_Data.json')


const Quiz = ({addPoint, score, setGameOver}) => {
    const [curNum, setNum] = useState(0);
    const [answer, setAnswer] = useState([]);
    const [animation, setAnimation] = useState(false)
   
    useEffect( ()=> {
        console.log(curNum)
        if (curNum >= data.length) {
            setGameOver(true)
            setNum(0)
            return;
        };
        setAnimation(false)
        randomize();
    }, [curNum])

    let renderAns = answer.map( (el,idx) => {

        return (
            <div onClick={ e => submitAnswer(e)}
                className={`
                answer_button
                answer_button_animation_${idx}
                `}
        
                key={idx}
                data-answer={el}
               
            >
                {idx+1}  {el}
            </div>
        )
    })

    //randomize answers array
    const randomize = () => {
        let result = [data[curNum].correct, ...data[curNum].incorrect]
        for (let i = 0; i < result.length -1; i++) {
            let j = Math.floor(Math.random() * (i+1));

            [result[i], result[j]] = [result[j], result[i]]
        }
        setAnswer(result)
    }

    const submitAnswer = (e) => {
        if (animation) return;
        let result = (e.target.dataset.answer === data[curNum].correct) 
        if (result) {
            e.target.classList.add("correct_answer")
            addPoint();
        } else {
            e.target.classList.add("incorrect_answer");
        }
        setAnimation(true)
       
        nextQuestion(e)
    }

    const resetAnimation = () => {
        let animated = document.getElementById("answer_button");
        animated.style.animation = 'none';
        animated.focus()
        animated.style.animation = null;
    }

    const nextQuestion = (e) => {
        e.target.addEventListener("animationend", () => {
            setAnimation(false);
            e.target.classList.remove('correct_answer');
            e.target.classList.remove('incorrect_answer');
            let buttons = document.getElementsByClass("answer_button")
            console.log(buttons)
            setNum(curNum+1);
  
 
        })
    }

    const field = () => {
        return (
            <div className="quiz_container">
                <div className="quiz_question">
                    {data[curNum].question}
                </div>
                <div className="quiz_answer">
                    {renderAns} 
                </div>
            </div>
        )
    }

    return (
        <div className="quiz_container">
            {curNum < data.length ? field() : null}
    

        </div>
    )
}





export default Quiz