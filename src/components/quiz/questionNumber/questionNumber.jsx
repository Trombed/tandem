import React from 'react';
import './style.css'

const QuestionNumber = ({number, muted, toggleMute}) => {
    
    const showMute = () => {
      return muted ?
                <i className="fas fa-volume-mute"></i>
                :
                <i className="fas fa-volume-up"></i>
    }
    
    return (
        <div className="number_container">
            <div className="mute_button" 
                onClick={toggleMute}
            >
                {showMute()}
            </div>
            <div>
                Question #{number+1}
            </div>
        </div>
    )
}

export default QuestionNumber