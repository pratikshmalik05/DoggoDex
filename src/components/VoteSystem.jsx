import React, { useState } from 'react';

const VoteSystem = () => {
  const [vote, setVote] = useState(null); // 'hot' or 'not'

  const handleVote = (type) => {
    // Basic interaction feedback
    setVote(type);
  };

  return (
    <div className="vote-system">
      <button 
        className={`vote-btn btn-hot ${vote === 'hot' ? 'active' : ''}`}
        onClick={() => handleVote('hot')}
        title="Hot!"
      >
        🔥
      </button>
      <button 
        className={`vote-btn btn-not ${vote === 'not' ? 'active' : ''}`}
        onClick={() => handleVote('not')}
        title="Not"
      >
        ❄️
      </button>
    </div>
  );
};

export default VoteSystem;
