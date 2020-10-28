import React from 'react'
import Question from '../question/question'
var data = require('../../util/Apprentice_TandemFor400_Data.json')

const Quiz = () => {
    let questions = data.map( (question, idx) => {
        return (
            <Question question={question} />
        )
    })
    return (
        <div>
            {questions}
        </div>
    )
}

export default Quiz