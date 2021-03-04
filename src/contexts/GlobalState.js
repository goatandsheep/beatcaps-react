import React, {useEffect, createContext, useState} from 'react';
import Auth from '@aws-amplify/auth';

/**
 * User Context
 */
export const GlobalContext = createContext();

export const GlobalProvider = ({state, children}) => {
  const [user, setUser] = useState(state.user);
  const [authState, setAuthState] = React.useState(state.authState);
  const [token, setToken] = React.useState(state.token);

  useEffect(() => {
    const updateAuthState = (authState) => setAuthState(authState);
    updateAuthState(state.authState);
  }, [state.authState, state.user]);

  useEffect(() => {
    const updateUser = async (user) => {
      if (user && user.signInUserSession) {
        setToken(`Bearer ${user.signInUserSession.accessToken.jwtToken}`);
        const creds = await Auth.currentUserCredentials();
        user.identityId = creds.identityId;
      }
      setUser(user);
    };

    updateUser(state.user);
  }, [state.user]);

  return (
    <GlobalContext.Provider value={{
      user,
      authState,
      token,
      setUser,
      setAuthState,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
