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
  const sessionUserKey = 'userObj';
  const session = JSON.parse(sessionStorage.getItem(sessionUserKey));
  console.log(sessionUserKey, JSON.stringify(session));
  const [user, setUser] = useState(session || defaultUser);

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
    const newState = {...data, auth: true};
    sessionStorage.setItem(sessionUserKey, JSON.stringify(newState));
    setUser(newState);
  };
  const logout = async () => {
    const req = {
      token: user.token,
    };
    await fetch(`${SERVER_DOMAIN}/logout`, {
      method: 'POST',
      body: JSON.stringify(req),
    });
    sessionStorage.removeItem(sessionUserKey);
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
