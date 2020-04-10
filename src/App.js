import React from 'react';
import './App.scss';
import {BrowserRouter as Router} from 'react-router-dom';
import Home from './views/Home';
import {AppProvider} from './AppContext';
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
      <AppProvider>
        <Router>
          <main className="section">
            {/* <Route path="/" render={
              () => (<Home />)
            } /> */}
            <Route path="/" component={Home} isAuthed={false} />
          </main>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App;
