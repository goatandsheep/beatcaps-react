import React, {createContext, useState} from 'react';

/**
 * Usage stuff
 */
export const UsageContext = createContext();

export const UsageProvider = (props) => {
  const usage = useState({
    beatcaps: 1,
    storage: 1,
    verified: false,
  });
  return (
    <UsageContext.Provider value={usage}>
      {props.children}
    </UsageContext.Provider>
  );
};
