import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut, AmplifyContainer, AmplifyAuthenticator } from '@aws-amplify/ui-react';

import Login from './pages/Login';
import {GlobalProvider, GlobalContext} from './contexts/GlobalState';
import Dashboard from './pages/Dashboard';
import TemplatesView from './pages/TemplatesView';
import TemplateWizard from './pages/TemplateWizard';
import SubmitFile from './pages/SubmitFile';
import FileView from './pages/FileView';
import TemplateDesigner from './pages/TemplateDesigner';
import {Route} from 'react-router-dom';
import NavMenu from './components/NavMenu';
import constants from './constants';


/**
 * Main App builder
 * @return {Object} reactDOM
 */
const App = () => {
  const awsconfig = {
    Auth: {
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: constants.AWS_IDENTITY_POOL_ID,

        // REQUIRED - Amazon Cognito Region
        region: constants.AWS_REGION,

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: constants.AWS_POOL_ID,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: constants.AWS_WEB_CLIENT_ID,
    }
  }

    console.log('awsconfig', awsconfig)

  const auth = () => {
    console.log('running auth')
    Amplify.configure(awsconfig);
    Auth.configure(awsconfig);
  }

  auth()

  // const currentConfig = Auth.configure();

  // console.log('currentConfig', currentConfig)

  const PrivateRoute = ({component: Component, ...attrs}) => (
    <Route {...attrs} render={(props) => (
      <GlobalContext.Consumer>
        {(state) => (state.user.auth ? <Component route={props} {...props.match.params} /> : <Login {...props.match.params} /> )}
      </GlobalContext.Consumer>
    )} />
  );
  return (
    <AmplifyContainer>
      <GlobalProvider>
        <Router>
          <div className="App">
            <NavMenu />
            <main className="container">
              <Switch>
                <Route exact={true} path="/" component={Dashboard} />
                <Route exact={true} path="/file/new" component={SubmitFile} />
                <Route exact={true} path="/templates/:id/apply" component={TemplateWizard} />
                <Route exact={true} path="/templates/new" component={TemplateDesigner} />
                <Route exact={true} path="/templates/:id" component={FileView} />
                <Route exact={true} path="/templates" component={TemplatesView} />
                <Route path="/file/:id" component={FileView} />
                <Route render={() => (<h1>Page Not Found</h1>)} />
              </Switch>
            </main>
          </div>
        </Router>
                <AmplifyAuthenticator />

      </GlobalProvider>
    </AmplifyContainer>
  );
}

// export default withAuthenticator(App);
export default App;
