import React from 'react';

const StartGameBtn = ({ start }) => {
    return (
        <button 
            className="waves-effect waves-light btn-large deep-purple lighten-1"
            onClick={start}
        >
            Play Snake
        </button>
    );
}

export default StartGameBtn;
