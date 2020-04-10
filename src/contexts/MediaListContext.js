import React, {createContext, useState} from 'react';

/**
 * Media Results
 */
export const MediaListContext = createContext();

export const MediaListProvider = (props) => {
  const mediaList = useState([{
    id: 'bob',
  }]);
  return (
    <MediaListContext.Provider value={mediaList}>
      {props.children}
    </MediaListContext.Provider>
  );
};
