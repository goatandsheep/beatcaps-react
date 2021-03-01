import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import TableRow from '../components/TableRow';

const Dashboard = () => {
  const globalConsumer = useContext(GlobalContext);

  const [mediaList, setMediaList] = useState('');
  const attrs = ['elementName', 'elementType', 'creationDate', 'updatedDate'];

  useEffect(() => {
    const fetchData = async () => {
      // if (!globalConsumer.token) {
      //   throw new Error('Auth token missing' + JSON.stringify(globalConsumer.user));
      // }
      if (globalConsumer.token) {
        const response = await fetch(`${constants.SERVER_DOMAIN}/jobs`, {
          headers: {
            Authorization: globalConsumer.token,
          },
        });
        const fileData = await response.json();
        setMediaList(fileData);
      }
    };
    fetchData();
  }, [globalConsumer.token]);

  return (
    <div>
      <h1 className="title is-1">Dashboard</h1>
      <div className="level has-background-info-light" >
        <div className="level-item is-flex-direction-column my-5">
          <p className="is-size-5 has-text-black is-block mb-3">
            Create a layout template
          </p>
          <Link to="/templates" className="button is-primary is-medium">Templates
            <span className="icon is-small is-left ml-1">
              <i className="fas fa-crop-alt"></i>
            </span>
          </Link>
        </div>
        <div className="level-item is-flex-direction-column my-5">
          <p className="is-size-5 has-text-black is-block mb-3">
            Upload new videos
          </p>
          <Link to="file/new" className="button is-warning is-medium">Upload
            <span className="icon is-small is-left ml-1">
              <i className="fas fa-crop-alt"></i>
            </span>
          </Link>
        </div>
      </div>

      <div className="has-text-left">
        <h2 className="title is-3 mb-5">Output List</h2>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-header-title">
            Outputs list ({mediaList ? mediaList.total : '0'})
          </h3>
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
            <tbody><TableRow prefix="/file" attrs={attrs} data={mediaList.elements} /></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
