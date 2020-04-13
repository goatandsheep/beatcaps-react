import React, {useContext} from 'react';
import {GlobalContext} from '../contexts/GlobalState';

const AuthButton = () => {
  const globals = useContext(GlobalContext);
  return (
    globals.user.auth ?
    (<span>
      <span>Welcome {globals.user.firstName}</span>
      <button onClick={globals.logout}>Logout</button>
    </span>) : null
  );
};
export default AuthButton;
