import React, {useContext} from 'react';
import {AuthState} from '@aws-amplify/ui-components';
import {GlobalContext} from '../contexts/GlobalState';

const AuthButton = () => {
  const globals = useContext(GlobalContext);
  return (
    globals.authState === AuthState.SignedIn && globals.user ?
    (<>
      <div className="mr-2">Welcome, <strong>{globals.user.firstName}</strong></div>
      <div className="buttons">
        <button onClick={globals.logout} className="button is-primary">Logout</button>
      </div>
    </>) : null
  );
};
export default AuthButton;
