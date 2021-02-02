import React, {useEffect, useContext, useState} from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import {withAuthenticator, AmplifyContainer, AmplifyAuthenticator} from '@aws-amplify/ui-react';
import {AuthState, onAuthUIStateChange} from '@aws-amplify/ui-components';

import {GlobalProvider, GlobalContext} from './contexts/GlobalState';
import Dashboard from './pages/Dashboard';
import TemplatesView from './pages/TemplatesView';
import TemplateWizard from './pages/TemplateWizard';
import SubmitFile from './pages/SubmitFile';
import FileView from './pages/FileView';
import TemplateDesigner from './pages/TemplateDesigner';
import NavMenu from './components/NavMenu';
import {awsAuthInit} from './utils/auth';

// Initialize Amplify
awsAuthInit();

/**
 * Main App builder
 * @return {Object} reactDOM
 */
const App = () => {
  const [user, setUser] = useState({});
  const [authState, setAuthState] = React.useState(null);

  useEffect(() => {
    // console.log('use effect in app');
    return onAuthUIStateChange((nextAuthState, authData) => {
      // console.log('auth changed', nextAuthState, authData);
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  const PrivateRoute = ({component: Component, ...attrs}) => (
    <Route {...attrs}>
      {
        authState === AuthState.SignedIn && user ?
        // context.authState === AuthState.SignedIn && context.user ?
          <Component /> :
          'not logged in'
      }
    </Route>
  );
  return (
    <GlobalProvider state={{user, authState}}>
      <AmplifyContainer>
        <AmplifyAuthenticator />
        <Router>
          <div className="App" style={{width: '100%', height: '100%'}}>
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
                <PrivateRoute render={() => (<h1>Page Not Found</h1>)} />
              </Switch>
            </main>
          </div>
        </Router>
      </AmplifyContainer>
    </GlobalProvider>
  );
};

export default withAuthenticator(App);
