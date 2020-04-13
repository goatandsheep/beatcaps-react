import React, {useContext} from 'react';
import {GlobalContext} from '../contexts/GlobalState';

const Dashboard = () => {
  const globals = useContext(GlobalContext);
  return (
    <div>
      <h1 className="title is-1">Dashboard</h1>
      <span>{JSON.stringify(globals)}</span>
    </div>
  );
};

export default Dashboard;
