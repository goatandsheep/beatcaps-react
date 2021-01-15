import React, {createContext, useState} from 'react';

/**
 * Media stuff
 */
export const MiscContext = createContext();

export const MiscProvider = (props) => {
  const misc = useState({
    name: '',
  });
  return (
    <MiscContext.Provider value={misc}>
      {props.children}
    </MiscContext.Provider>
  );
};
