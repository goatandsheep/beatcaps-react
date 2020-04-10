import React from 'react';
import './App.scss';
import {BrowserRouter as Router} from 'react-router-dom';
import Login from './pages/Login';
import {ConstsProvider} from './ConstsContext';
const Route = require('react-router-dom').Route;

/**
 * Main App builder
 * @return {Object} reactDOM
 */
function App() {
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
      <ConstsProvider>
        <Router>
          <main className="section">
            {/* <Route path="/" render={
              () => (<Login />)
            } /> */}
            <Route path="/" component={Login} isAuthed={false} />
          </main>
        </Router>
      </ConstsProvider>
    </div>
  );
}

export default App;
