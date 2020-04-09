import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';

/**
 * Main App builder
 * @return {Object} reactDOM
 */
function App() {
  return (
    <Router>
      <div className="App">
        <header >
          <img src={logo} className="App-logo" alt="logo" />
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
      </div>
    </Router>
  );
}

export default App;
