import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';

const MOCKED_TEMPLATES_RESPONSE = [
  {
    templateName: 'Template 1',
    templateId: '1111',
    videoSlots: 4
  },
  {
    templateName: 'Template 2',
    templateId: '2222',
    videoSlots: 1
  },
  {
    templateName: 'Template 3',
    templateId: '3333',
    videoSlots: 3
  },
]

const PipWizard = () => {
  const globalConsumer = useContext(GlobalContext);

  const [mediaList, setMediaList] = useState('');
  const [templateList, setTemplateList] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

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

  useEffect(() => {
    const fetchTemplates = () => {
      // TODO: use real endpoint
      setTemplateList(MOCKED_TEMPLATES_RESPONSE)
    }

    fetchTemplates()
  }, [])

  const makeVideoSlotSelects = () => {
    if (!mediaList || !mediaList.length) return

    const selects = []

    for (let i = 0; i < mediaList; i++) {
      const id = `videoSlotOption${i}`

      selects.push(
        <div key={id}>
          <label htmlFor={id} className="label">Video Slot {i + 1}</label>
          <div className="control">
            <div className="select">
              <select id={id}>
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

  const handleTemplateChange = (evt) => {
    const newIndex = evt.target.value;
    console.log(newIndex, templateList[newIndex])
    setSelectedTemplate(templateList[newIndex])
  }

  return (
    <div>
      <h1 className="title is-1">PIP Wizard</h1>
      <form className="has-text-left">
        <label htmlFor="templateName" className="label">Template Name</label>
        <div className="control">
          <div id="templateName" className="select">
          {templateList && templateList.length ? (
            <select onChange={handleTemplateChange}>
              {templateList.map((template, i) => <option key={template.templateId} value={i}>{template.templateName}</option>)}
            </select>)
            : null}
          </div>
        </div>

        {selectedTemplate ? <p>{selectedTemplate.templateName} has {selectedTemplate.videoSlots} video slot(s)</p> : null}

        {makeVideoSlotSelects()}

        <button onClick={() => console.log('submitting wizard')} className="button is-primary">Submit</button>
      </form>
    </div>
  );
};

export default PipWizard;
