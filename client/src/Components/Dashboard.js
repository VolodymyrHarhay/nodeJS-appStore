import React, { useReducer, useState } from 'react';
import { Button } from 'react-bootstrap';


function Dashboard(props) {
  const [ showSignInDialog, setShowSignInDialog ] = useState(false);

  function handleClick() {
    setShowSignInDialog(true);
  }

  return (
      <div>
        <Button variant="link" onClick={handleClick}>Sign In</Button>
      </div>
  );
};

export default Dashboard;