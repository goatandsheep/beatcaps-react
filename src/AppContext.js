import React, {createContext} from 'react';

/**
 * App constants
 */
export const AppContext = createContext();

export const AppProvider = (props) => {
  const attrs = {
    SERVER_DOMAIN: process.env.REACT_APP_SERVER_DOMAIN,
  };
  return (
    <AppContext.Provider value={attrs}>
      {props.children}
    </AppContext.Provider>
  );
};
