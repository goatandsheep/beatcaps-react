import React, {useContext} from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Login from './pages/Login';
import {GlobalProvider, GlobalContext} from './contexts/GlobalState';
import Dashboard from './pages/Dashboard';
const Route = require('react-router-dom').Route;

/**
 * Main App builder
 * @return {Object} reactDOM
 */
function App() {
  const PrivateRoute = ({component: Component, ...attrs}) => (
    <Route {...attrs} render={(props) => (
      <GlobalContext.Consumer>
        {(cons) => (cons.user.auth ? <Component {...props} /> : <Login /> )}
      </GlobalContext.Consumer>
    )} />
  );
  return (
    <div className="App">
      <header >
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <GlobalProvider>
        <Router>
          <main className="section">
            <Switch>
              {/* <Route path="/login" component={Login} /> */}
              <PrivateRoute exact={true} path="/" component={Dashboard} />
              <Route render={() => (<h1>Page Not Found</h1>)} />
            </Switch>
          </main>
        </Router>
      </GlobalProvider>
    </div>
  );
}

export default App;
