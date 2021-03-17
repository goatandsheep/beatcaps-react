import React, {createContext, useState} from 'react';

/**
 * Media stuff
 */
export const MediaContext = createContext();

export const MediaProvider = (props) => {
  const media = useState({
    id: 'bob',
  });
  return (
    <MediaContext.Provider value={media}>
      {props.children}
    </MediaContext.Provider>
  );
};
