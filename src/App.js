import React, {useEffect, useState} from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {awsAuthInit} from './utils/auth';
import {withAuthenticator, AmplifyContainer, AmplifyAuthenticator} from '@aws-amplify/ui-react';
import {AuthState, onAuthUIStateChange} from '@aws-amplify/ui-components';
import constants from './constants';

import {GlobalProvider} from './contexts/GlobalState';
import Dashboard from './pages/Dashboard';
import TemplatesView from './pages/TemplatesView';
import TemplateWizard from './pages/TemplateWizard';
import BeatcapsWizard from './pages/BeatcapsWizard';
import SubmitFile from './pages/SubmitFile';
import FileView from './pages/FileView';
import NavMenu from './components/NavMenu';
import TemplateDetailsPage from './pages/TemplateDetailsPage';
import TemplateEditor from './pages/TemplateEditor';
import TemplateCreator from './pages/TemplateCreator';
import ProcessPicker from './pages/ProcessPicker';


// Initialize Amplify
awsAuthInit();
/**
 * Main App builder
 * @return {Object} reactDOM
 */
const App = () => {
  const [user, setUser] = useState({});
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  const handleAuthStateChange = (nextAuthState, authData) => {
    if (nextAuthState === AuthState.SignedIn) {
      setAuthState(nextAuthState);
      setUser(authData);
      // window.alert('authy');
    } else if (authData) {
      setUser(authData);
      // window.alert('useee');
    }
  };

  return (
    <GlobalProvider state={{user, authState}}>
      <AmplifyContainer>
        <AmplifyAuthenticator handleAuthStateChange={handleAuthStateChange}/>
        <Router>
          <div className="App" style={{width: '100%', height: '100%'}}>
            <NavMenu />
            <main className="container">
              <Switch>
                <Route exact={true} path="/" component={Dashboard} />
                <Route exact={true} path="/file/new" component={SubmitFile} />
                <Route exact={true} path="/file/use" component={constants.SHOW_BEATCAPS ? BeatcapsWizard : SubmitFile} />
                <Route exact={true} path="/templates/:id/use" component={TemplateWizard} />
                <Route exact={true} path="/templates/new" component={TemplateCreator} />
                <Route exact={true} path="/templates/:id/edit" component={TemplateEditor} />
                <Route exact={true} path="/templates/:id" component={TemplateDetailsPage} />
                <Route exact={true} path="/templates" component={TemplatesView} />
                <Route exact={true} path="/processpicker" component={ProcessPicker} />
                <Route path="/file/:id" component={FileView} />
                <Route render={() => (<h1>Page Not Found</h1>)} />
              </Switch>
            </main>
          </div>
        </Router>
      </AmplifyContainer>
    </GlobalProvider>
  );
};

export default withAuthenticator(App);
