import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import TableRow from '../components/TableRow';

const Dashboard = () => {
  const globalConsumer = useContext(GlobalContext);

  const [mediaList, setMediaList] = useState('');
  const attrs = ['elementName', 'elementType', 'creationDate', 'updatedDate'];
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${constants.SERVER_DOMAIN}/jobs`, {
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
      <div className="level">
        <div className="level-item">
          <a className="button is-primary is-fullwidth" href="templates" title="Templates page">
            Design&nbsp;&nbsp;
            <span className="icon is-small is-left">
              <i className="fas fa-crop-alt"></i>
            </span>
          </a>
        </div>
        <div className="level-item">
          <a className="button is-warning is-fullwidth" href="file/new" title="Upload file page">
            Upload&nbsp;&nbsp;
            <span className="icon is-small is-left">
              <i className="fas fa-upload"></i>
            </span>
          </a>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h2 className="card-header-title">
            Outputs list ({mediaList ? mediaList.total : '0'})
          </h2>
          <a className="button is-info is-rounded" href="file/new" title="Begin Process Wizard">
            Create&nbsp;&nbsp;
            <span className="icon is-small is-left">
              <i className="fas fa-brush"></i>
            </span>
          </a>
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
              <TableRow prefix="/file" attrs={attrs} data={mediaList.elements} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
