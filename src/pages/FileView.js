import React, {useContext, useEffect, useState} from 'react';
import { Rnd } from "react-rnd";
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import StatusBadge from '../components/StatusBadge'

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

const FileView = (props) => {
  const globalConsumer = useContext(GlobalContext);
  const [media, setMedia] = useState('');

  const [rnd, setRnd] = useState({
    width: 200,
    height: 200,
    x: 10,
    y: 10
  });

  // this.state = {
  //   width: 200,
  //   height: 200,
  //   x: 10,
  //   y: 10
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${constants.SERVER_DOMAIN}/files/${props.id}`, {
        headers: {
          Authorization: globalConsumer.user.token,
        },
      });
      const fileData = await response.json();
      setMedia(fileData);
    };
    fetchData();
  }, [globalConsumer, props.id]);

  useEffect(() => {
    console.log('X and Y values', rnd);
  }, [rnd]);

  return (
    <div>
      <h1 className="title is-1">File: {media.elementName}</h1>
      <div className="card card-content content">
        <div>
          <p class="subtitle is-5 has-text-left">
            <label>ID</label>: <strong>{media ? media.uuid : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p class="subtitle is-5 has-text-left">
            <label>File name</label>: <strong>{media ? media.elementName : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p class="subtitle is-5 has-text-left">
            <label>Type</label>: <strong>{media ? media.elementType : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p class="subtitle is-5 has-text-left">
            <label>Created</label>: <strong>{media ? media.creationDate : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p class="subtitle is-5 has-text-left">
            <label>Updated</label>: <strong>{media ? media.updatedDate : <span className="is-loading">Loading</span>}</strong>
          </p>
        </div>
        <div>
          <p class="subtitle is-5 has-text-left">
            <label>Status</label>: {media ? <StatusBadge status={media.status} /> : <StatusBadge status="Loading" />}
          </p>
        </div>
      </div>
    
      <Rnd
        style={style}
        size={{ width: rnd.width, height: rnd.height }}
        position={{ x: rnd.x, y: rnd.y }}
        onDragStop={(e, d) => {
          setRnd({ x: d.x, y: d.y });
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setRnd({
            width: ref.style.width,
            height: ref.style.height,
            ...position
          });
        }}
        >
        Rnd
      </Rnd>
    </div>
  );
};

export default FileView;
