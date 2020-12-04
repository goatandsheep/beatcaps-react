import React, {useContext, useEffect, useState, useRef} from 'react';
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

  const [rnd2, setRnd2] = useState({
    width: 200,
    height: 200,
    x: 50,
    y: 50
  });

  const [rnd3, setRnd3] = useState({
    width: 200,
    height: 200,
    x: 150,
    y: 150
  });

  const rndManagerRef = useRef({
    maxZIndex: "999",
    prevDraggedNode: null,
    prevDraggedNodeZIndex: null
  });

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
    console.log('first(1) rnd- X and Y values', rnd);
  }, [rnd]);

  useEffect(() => {
    console.log('second(2) rnd- X and Y values', rnd2);
  }, [rnd2]);

  useEffect(() => {
    console.log('third(3) rnd- X and Y values', rnd3);
  }, [rnd3]);

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
        onDragStart={(e, node) => {
          const manager = rndManagerRef.current;
          if (manager.prevDraggedNode) {
            manager.prevDraggedNode.style.zIndex = manager.prevDraggedNodeZIndex;
          }
          manager.prevDraggedNode = node.node;
          manager.prevDraggedNodeZIndex = manager.prevDraggedNode.style.zIndex;
          manager.prevDraggedNode.style.zIndex = manager.maxZIndex;
        }}
        >
        Rnd
      </Rnd>

      <Rnd
        style={style}
        size={{ width: rnd2.width, height: rnd2.height }}
        position={{ x: rnd2.x, y: rnd2.y }}
        onDragStop={(e, d) => {
          setRnd2({ x: d.x, y: d.y });
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setRnd2({
            width: ref.style.width,
            height: ref.style.height,
            ...position
          });
        }}
        onDragStart={(e, node) => {
          const manager = rndManagerRef.current;
          if (manager.prevDraggedNode) {
            manager.prevDraggedNode.style.zIndex = manager.prevDraggedNodeZIndex;
          }
          manager.prevDraggedNode = node.node;
          manager.prevDraggedNodeZIndex = manager.prevDraggedNode.style.zIndex;
          manager.prevDraggedNode.style.zIndex = manager.maxZIndex;
        }}
        >
        Rnd2
      </Rnd>

      <Rnd
        style={style}
        size={{ width: rnd3.width, height: rnd3.height }}
        position={{ x: rnd3.x, y: rnd3.y }}
        onDragStop={(e, d) => {
          setRnd3({ x: d.x, y: d.y });
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          setRnd3({
            width: ref.style.width,
            height: ref.style.height,
            ...position
          });
        }}
        onDragStart={(e, node) => {
          const manager = rndManagerRef.current;
          if (manager.prevDraggedNode) {
            manager.prevDraggedNode.style.zIndex = manager.prevDraggedNodeZIndex;
          }
          manager.prevDraggedNode = node.node;
          manager.prevDraggedNodeZIndex = manager.prevDraggedNode.style.zIndex;
          manager.prevDraggedNode.style.zIndex = manager.maxZIndex;
        }}
        >
        Rnd3
      </Rnd>
      
    </div>
  );
};

export default FileView;
