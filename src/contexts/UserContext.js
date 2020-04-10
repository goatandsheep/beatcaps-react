import React, {createContext, useState} from 'react';

/**
 * User stuff
 */
export const UserContext = createContext();

export const UserProvider = (props) => {
  const user = useState({
    username: 'bob',
  });
  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
};
