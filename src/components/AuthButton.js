import React, {useContext} from 'react';
import {AuthState} from '@aws-amplify/ui-components';
import {GlobalContext} from '../contexts/GlobalState';
import {AmplifySignOut} from '@aws-amplify/ui-react';

const AuthButton = () => {
  const globals = useContext(GlobalContext);
  return (
    globals.authState === AuthState.SignedIn && globals.user ?
    (<>
      <div className="mr-2">Welcome, <strong>{globals.user.username}</strong></div>
      <div className="buttons">
        <AmplifySignOut />
      </div>
    </>) : (
      <div className="buttons">
        <AmplifySignOut />
      </div>
      )
  );
};
export default AuthButton;
