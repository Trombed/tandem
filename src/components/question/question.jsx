import React from 'react';


const Question = ({question}) => {
    console.log(question)
    return (
        <div>
            {question.question}
            {question.incorrect}
            {question.correct}
        </div>
    )
}

export default Question