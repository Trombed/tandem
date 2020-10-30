import React, {useState, useEffect} from 'react'
import './style.css'
var data = require('../../util/Apprentice_TandemFor400_Data.json')


const Quiz = ({addPoint, setGameOver, setTotal}) => {
    const [curNum, setNum] = useState(0);
    const [answer, setAnswer] = useState([]);

   
    useEffect( ()=> {
    
        if (curNum >= data.length) {
            setGameOver()
            setNum(0)
            return;
        };
   
        // setAnimation(false)
        randomize();
    }, [curNum])
    // let renderAns = []
    setTotal(data.length)
    let renderAns = answer.map( (el,idx) => {
        return (
                <div onClick={ e => submitAnswer(e)}
                className={`answer_button`}
        
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
        for (let i = result.length-1; i >= 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            
            [result[i], result[j]] = [result[j], result[i]]
        }
        setAnswer(result)
    }

    const submitAnswer = (e) => {
       
        let result = (e.target.dataset.answer === data[curNum].correct) 
        if (result) {
            e.target.classList.add("correct_answer")
           
            addPoint();
        } else {
            e.target.classList.add("incorrect_answer");
        }
        // setAnimation(true)
        
        
        setNum(curNum+1);
        
    }




    const field = () => {
        return (
            <div className="quiz_container_2">
                <div className="quiz_question">
                
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
    

        </div>
    )
}





export default Quiz