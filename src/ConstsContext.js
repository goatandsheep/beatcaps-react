import React, {createContext} from 'react';

/**
 * App constants
 */
export const ConstsContext = createContext();

export const ConstsProvider = (props) => {
  const attrs = {
    SERVER_DOMAIN: process.env.REACT_APP_SERVER_DOMAIN,
  };
  return (
    <ConstsContext.Provider value={attrs}>
      {props.children}
    </ConstsContext.Provider>
  );
};
