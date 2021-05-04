import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import TemplateDesignerForm from '../components/TemplateDesignerForm';

const TemplateCreator = () => {
  const globalConsumer = useContext(GlobalContext);
  const history = useHistory();

  const handleCreateTemplate = async (formData) => {
    if (!globalConsumer.token) {
      throw new Error('Auth token missing' + JSON.stringify(globalConsumer.user));
    }

    const roundedViewOptions = formData.views.map((view) => {
      return {
        x: Math.ceil(view.x),
        y: Math.ceil(view.y),
        height: Math.ceil(view.height),
        // don't send the width to the backend if using default 16:9
        ...(view.lockAspectRatio ? {} : {width: Math.ceil(view.width)}),
      };
    });

    const templateReq = {
      ...formData,
      height: Math.ceil(formData.height),
      width: Math.ceil(formData.width),
      views: roundedViewOptions,
    };

    // don't send the width to the backend if using default 16:9
    if (templateReq.lockAspectRatio) {
      delete templateReq.width;
    }

    const response = await fetch(`${constants.SERVER_DOMAIN}/templates/new`, {
      method: 'POST',
      body: JSON.stringify(templateReq),
      headers: {
        'Authorization': globalConsumer.token,
        'Content-Type': 'application/json',
      },
    });

    await response.json();

    history.push('/templates');
  };

  return <TemplateDesignerForm handleSubmit={handleCreateTemplate}/>;
};

export default TemplateCreator;
