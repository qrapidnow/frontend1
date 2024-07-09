import React, { useState } from 'react';

const TokenInput = ({ onTokenChange }) => {
  const [token, setToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onTokenChange(token);
  };

  return (
    <div>
      <h2>Enter Token</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Token:</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TokenInput;
