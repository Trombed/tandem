import React from 'react';
import './style.css'

const Splash = ({setQuiz}) => {
    return (
        <div className="splash_screen">
            Tandem Quiz
            Start Game
            <div
                className="start_button" 
                onClick={ () => setQuiz(true)}>
                
                START
            </div>
            

        </div>
    )

}

export default Splash 