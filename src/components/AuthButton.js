import React, {useContext} from 'react';
import {GlobalContext} from '../contexts/GlobalState';

const AuthButton = () => {
  const globals = useContext(GlobalContext);
  return (
    globals.user.auth ?
    (<>
      <div className="navbar-item">Welcome, <strong>{globals.user.firstName}</strong></div>
      <div className="navbar-item buttons">
        <button onClick={globals.logout} className="button is-primary">Logout</button>
      </div>
    </>) : null
  );
};
export default AuthButton;
