import React from 'react';


const Question = ({question}) => {
  
    return (
        <div>
            {question.question}
            {question.incorrect}
            {question.correct}
        </div>
    )
}

export default Question