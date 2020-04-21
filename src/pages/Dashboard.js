import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import TableRow from '../components/TableRow';

const Dashboard = () => {
  const globalConsumer = useContext(GlobalContext);

  const [mediaList, setMediaList] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${constants.SERVER_DOMAIN}/files`, {
        headers: {
          Authorization: globalConsumer.user.token,
        },
      });
      const fileData = await response.json();
      setMediaList(fileData);
    };
    fetchData();
  }, [globalConsumer]);
  return (
    <div>
      <h1 className="title is-1">Dashboard</h1>
      <div className="card">
        <div className="card-header">
          <h2 className="card-header-title">Files list (
            {mediaList ? mediaList.total : '0'})
          </h2>
          <a className="button is-info is-rounded" href="file/new">New</a>
        </div>
        <div className="card-content content">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>File name</th>
                <th>Type</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Status</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>ID</th>
                <th>File name</th>
                <th>Type</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Status</th>
              </tr>
            </tfoot>
            <tbody>
              <TableRow prefix="/file" data={mediaList.elements} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
