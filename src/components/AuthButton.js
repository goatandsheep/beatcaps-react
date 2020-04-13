import React, {useContext} from 'react';
import {GlobalContext} from '../contexts/GlobalState';

const AuthButton = () => {
  const globals = useContext(GlobalContext);
  return (
    globals.user.auth ?
    <button onClick={globals.logout}>Logout</button> : null
  );
};
export default AuthButton;