import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Amplify, { Auth } from 'aws-amplify';
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
function App() {
  // Amplify.configure({
  //   Auth: {

  //       // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
  //       identityPoolId: constants.AWS_IDENTITY_POOL_ID,

  //       // REQUIRED - Amazon Cognito Region
  //       region: constants.AWS_REGION,

  //       // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
  //       // Required only if it's different from Amazon Cognito Region
  //       // identityPoolRegion: 'XX-XXXX-X',

  //       // OPTIONAL - Amazon Cognito User Pool ID
  //       userPoolId: constants.AWS_POOL_ID,

  //       // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  //       // userPoolWebClientId: 'a1b2c3d4e5f6g7h8i9j0k1l2m3',

  //       // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
  //       // mandatorySignIn: false,
  //   }
  // });

  const currentConfig = Auth.configure();

  console.log('currentConfig', currentConfig)

  const PrivateRoute = ({component: Component, ...attrs}) => (
    <Route {...attrs} render={(props) => (
      <GlobalContext.Consumer>
        {(state) => (state.user.auth ? <Component route={props} {...props.match.params} /> : <Login {...props.match.params} /> )}
      </GlobalContext.Consumer>
    )} />
  );
  return (
    <div className="App">
      <GlobalProvider>
        <Router>
          <NavMenu />
          <main className="container">
            <Switch>
              <PrivateRoute exact={true} path="/" component={Dashboard} />
              <PrivateRoute exact={true} path="/file/new" component={SubmitFile} />
              <PrivateRoute exact={true} path="/templates/:id/apply" component={TemplateWizard} />
              <PrivateRoute exact={true} path="/templates/new" component={TemplateDesigner} />
              <PrivateRoute exact={true} path="/templates/:id" component={FileView} />
              <PrivateRoute exact={true} path="/templates" component={TemplatesView} />
              <PrivateRoute path="/file/:id" component={FileView} />
              <Route render={() => (<h1>Page Not Found</h1>)} />
            </Switch>
          </main>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
