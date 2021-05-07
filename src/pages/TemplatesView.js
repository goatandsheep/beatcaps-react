import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import TableRow from '../components/TableRow';

const TemplatesView = () => {
  const globalConsumer = useContext(GlobalContext);

  const attrs = ['name', 'height'];
  const [mediaList, setMediaList] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (globalConsumer.token) {
        const response = await fetch(`${constants.SERVER_DOMAIN}/templates`, {
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
      <h1 className="title is-1">Templates</h1>
      <div className="card">
        <div className="card-header">
          <h2 className="card-header-title">
            Templates list ({mediaList ? mediaList.total || mediaList.length : '0'})
          </h2>
          <a className="button is-info is-rounded" href="templates/new" title="Begin Process Wizard">
            New&nbsp;&nbsp;
            <span className="icon is-small is-left">
              <i className="fas fa-crop-alt"></i>
            </span>
          </a>
        </div>
        <div className="card-content content">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Height</th>
                <th>Use</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Height</th>
                <th>Use</th>
              </tr>
            </tfoot>
            <tbody>
              <TableRow prefix="/templates" action="/use" actionLabel="Use" attrs={attrs} data={mediaList} />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TemplatesView;
