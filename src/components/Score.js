import React from 'react';

const Score = ({ score }) => {
   return (
        <div 
            style={{ 
                color: "#81c784", 
                fontWeight: "bold", 
                fontSize: "20px" 
            }}
        >
            Score: {score} pts
        </div>
   )
}

export default Score;
