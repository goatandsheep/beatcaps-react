import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {GlobalContext} from '../contexts/GlobalState';
import constants from '../constants';
import TemplateDesignerForm from '../components/TemplateDesignerForm';

const TemplateCreator = () => {
  const globalConsumer = useContext(GlobalContext);
  const history = useHistory();

  const handleCreateTemplate = async (formattedFormData) => {
    if (!globalConsumer.token) {
      throw new Error('Auth token missing' + JSON.stringify(globalConsumer.user));
    }

    const response = await fetch(`${constants.SERVER_DOMAIN}/templates/new`, {
      method: 'POST',
      body: JSON.stringify(formattedFormData),
      headers: {
        'Authorization': globalConsumer.token,
        'Content-Type': 'application/json',
        'X-Auth-Token': globalConsumer.user.identityId,
      },
    });

    await response.json();

    history.push('/templates');
  };

  return <TemplateDesignerForm handleSubmit={handleCreateTemplate}/>;
};

export default TemplateCreator;
