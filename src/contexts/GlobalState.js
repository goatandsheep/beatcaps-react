import React, {useEffect, createContext, useState} from 'react';

/**
 * User Context
 */
export const GlobalContext = createContext();

export const GlobalProvider = ({state, children}) => {
  const [user, setUser] = useState(state.user);
  const [authState, setAuthState] = React.useState(state.authState);
  const [token, setToken] = React.useState(state.authState);

  useEffect(() => {
    const updateAuthState = (authState) => setAuthState(authState);
    updateAuthState(state.authState);
  }, [state.authState, state.user]);

  useEffect(() => {
    const updateUser = (user) => {
      setUser(state.user);

      if (user && user.signInUserSession) {
        setToken(`Bearer ${user.signInUserSession.accessToken.jwtToken}`);
      }
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
