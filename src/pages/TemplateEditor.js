import React, {useContext, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import TemplateDesignerForm from '../components/TemplateDesignerForm';
import {addDefaultWidth} from '../utils/templateUtils';

const TemplateEditor = ({match}) => {
  const templateId = match.params.id;
  const globalConsumer = useContext(GlobalContext);
  const history = useHistory();

  const [template, setTemplate] = useState(null);

  useEffect(() => {
    // I copied and pasted this function from TemplateWizard, should eventually consolidate them.
    const fetchTemplateData = async () => {
      const response = await fetch(`${constants.SERVER_DOMAIN}/templates/${templateId}`, {
        headers: {
          Authorization: globalConsumer.token,
        },
      });
      const fileData = await response.json();

      // Error handling if error
      if (!fileData.message) {
        // add width if missing from data
        setTemplate(addDefaultWidth(fileData));
      }
    };

    fetchTemplateData();
  }, [globalConsumer.token, templateId]);

  const handlePatchTemplate = async (formattedFormData) => {
    if (!globalConsumer.token) {
      throw new Error('Auth token missing' + JSON.stringify(globalConsumer.user));
    }

    // !! I'm getting an error for patch.
    // Access to fetch at 'http://localhost:5000/templates/26a58de2-8fb3-4dd2-94db-4410e2593218'
    // from origin 'http://localhost:3000' has been blocked by CORS policy:
    // Method PATCH is not allowed by Access-Control-Allow-Methods in preflight response.
    const response = await fetch(`${constants.SERVER_DOMAIN}/templates/${templateId}`, {
      method: 'PATCH',
      body: JSON.stringify(formattedFormData),
      headers: {
        'Authorization': globalConsumer.token,
        'Content-Type': 'application/json',
      },
    });

    await response.json();

    history.push(`/templates/${templateId}`);
  };

  return template ? <TemplateDesignerForm initialTemplateData={template} handleSubmit={handlePatchTemplate} /> : null;
};

export default TemplateEditor;
