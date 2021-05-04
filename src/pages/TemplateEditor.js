import React, {useContext, useState, useEffect} from 'react';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import TemplateDesignerForm from '../components/TemplateDesignerForm';

const TemplateEditor = ({match}) => {
  const globalConsumer = useContext(GlobalContext);

  const [template, setTemplate] = useState(null);

  useEffect(() => {
    // I copied and pasted this function from TemplateWizard, should eventually consolidate them.
    const fetchTemplateData = async () => {
      const response = await fetch(`${constants.SERVER_DOMAIN}/templates/${match.params.id}`, {
        headers: {
          Authorization: globalConsumer.token,
        },
      });
      const fileData = await response.json();

      // Error handling if error
      if (!fileData.message) {
        setTemplate(fileData);
      }
    };

    fetchTemplateData();
  }, [globalConsumer.token, match.params.id]);

  const handlePatchTemplate = () => {

  };
  console.log('temp', template);
  return template ? <TemplateDesignerForm initialTemplateData={template} handleSubmit={handlePatchTemplate} /> : null;
};

export default TemplateEditor;
