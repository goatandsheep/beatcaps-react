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
    const updateAuthState = () => setAuthState(state.authState);

    updateAuthState();
  }, [state.authState]);

  useEffect(() => {
    const updateUser = () => {
      setUser(state.user);

      if (!state.user.signInUserSession) return;
      setToken(`Bearer ${state.user.signInUserSession.jwtToken}`);
    };

    updateUser();
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
