import React, {createContext} from 'react';

/**
 * App constants
 */
export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const attrs = {
    SERVER_DOMAIN: process.env.REACT_APP_SERVER_DOMAIN,
  };
  return (
    <GlobalContext.Provider value={attrs}>
      {props.children}
    </GlobalContext.Provider>
  );
};
