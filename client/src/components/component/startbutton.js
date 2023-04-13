import React, { useState } from 'react';
import axios from 'axios';

function ButtonStart() {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
    axios.post('/start-firewall')
      .then(response => {
        console.log(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Loading...' : 'Start Firewall'}
    </button>
  );
}

export default ButtonStart;
