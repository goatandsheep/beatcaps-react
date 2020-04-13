import React, {createContext, useState} from 'react';
import constants from '../constants';

/**
 * App constants
 */
export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const {SERVER_DOMAIN} = constants;
  const defaultUser = {
    username: '',
    token: '',
    auth: false,
  };
  const [user, setUser] = useState(defaultUser);

  const login = async (username, password) => {
    const req = {
      username,
      password,
    };
    const response = await fetch(`${SERVER_DOMAIN}/login`, {
      method: 'POST',
      body: JSON.stringify(req),
    });
    const data = await response.json();
    console.log('user', data);
    setUser({...data, auth: true});
  };
  const logout = async () => {
    const req = {
      token: user.token,
    };
    await fetch(`${SERVER_DOMAIN}/logout`, {
      method: 'POST',
      body: JSON.stringify(req),
    });
    setUser(defaultUser);
  };
  return (
    <GlobalContext.Provider value={{
      login,
      logout,
      user,
    }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
