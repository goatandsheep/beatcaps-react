import React from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, useParams} from 'react-router-dom';
import Login from './pages/Login';
import {GlobalProvider, GlobalContext} from './contexts/GlobalState';
import Dashboard from './pages/Dashboard';
import SubmitFile from './pages/SubmitFile';
import AuthButton from './components/AuthButton';
import FileView from './pages/FileView';
const Route = require('react-router-dom').Route;

/**
 * Main App builder
 * @return {Object} reactDOM
 */
function App() {
  const PrivateRoute = ({component: Component, ...attrs}) => (
    <Route {...attrs} render={(props) => (
      <GlobalContext.Consumer>
        {(state) => (state.user.auth ? <Component {...props} /> : <Login /> )}
      </GlobalContext.Consumer>
    )} />
  );
  const ParamsRoute = ({component: Component, ...attrs}) => {
    const {params} = useParams();
    console.log('params: ', JSON.stringify(params));
    return (
      <Route {...attrs} render={() => {
        return <Component {...params} />;
      }}
      />
    );
  };
  return (
    <div className="App">
      <GlobalProvider>
        <header >
          <span>
            Edit <code>src/App.js</code> and save to reload.
          </span>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <AuthButton />
        </header>
        <Router>
          <main className="section">
            <Switch>
              {/* <Route path="/login" component={Login} /> */}
              <PrivateRoute exact={true} path="/" component={Dashboard} />
              <PrivateRoute exact={true} path="/new" component={SubmitFile} />
              <ParamsRoute path="/file/:id" component={FileView} />
              <Route render={() => (<h1>Page Not Found</h1>)} />
            </Switch>
          </main>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
