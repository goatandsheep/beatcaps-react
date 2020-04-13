import React, {useContext} from 'react';
import {GlobalContext} from '../contexts/GlobalState';

const Dashboard = () => {
  const globals = useContext(GlobalContext);
  return (
    <>
      <span>{JSON.stringify(globals)}</span>
    </>
  );
};

export default Dashboard;
