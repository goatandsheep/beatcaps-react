import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import TableRow from '../components/TableRow';

const PipWizard = () => {
  const globalConsumer = useContext(GlobalContext);

  const [mediaList, setMediaList] = useState('');
  const [videoSlots, setVideoSlots] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${constants.SERVER_DOMAIN}/files`, {
        headers: {
          Authorization: globalConsumer.user.token,
        },
      });
      const fileData = await response.json();
      console.log(fileData)
      setMediaList(fileData.elements);
    };
    fetchData();
  }, [globalConsumer]);

  const makeVideoSlotSelects = () => {
    if (!mediaList || !mediaList.length) return

    const selects = []

    for (let i = 0; i < videoSlots; i++) {
      selects.push(
        <div for="templateName">
          <label class="label">Video Slot {i + 1}</label>
          <div class="control">
            <div id={`videoSlot{i}`} class="select">
              <select>
                {
                  mediaList.map(media => {
                    return <option key={media.uuid} value={media.uuid}>
                      {media.elementName}
                    </option>
                  })
                }
              </select>
            </div>
          </div>
        </div>
      )
    }

    return selects
  }

  return (
    <div>
      <h1 className="title is-1">PIP Wizard</h1>
      <form class="has-text-left">
        <label for="templateName" class="label">Template Name</label>
        <div class="control">
          <div id="templateName" class="select">
            <select>
              <option value="temp1">Template 1</option>
              <option value="temp2">Template 3</option>
            </select>
          </div>
        </div>

        <p>Template has {videoSlots} video slot(s)</p>

        {makeVideoSlotSelects()}

        <button onClick={() => console.log('submitting wizard')} className="button is-primary">Submit</button>
      </form>
    </div>
  );
};

export default PipWizard;
