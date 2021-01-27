import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Login from './pages/Login';
import {GlobalProvider, GlobalContext} from './contexts/GlobalState';
import Dashboard from './pages/Dashboard';
import TemplatesView from './pages/TemplatesView';
import TemplateWizard from './pages/TemplateWizard';
import SubmitFile from './pages/SubmitFile';
import FileView from './pages/FileView';
import TemplateDesigner from './pages/TemplateDesigner';
import {NavLink, Route} from 'react-router-dom';
import NavMenu from './components/NavMenu';


/**
 * Main App builder
 * @return {Object} reactDOM
 */
function App() {
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
