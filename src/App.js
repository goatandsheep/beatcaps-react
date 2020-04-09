import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import {BrowserRouter as Router} from 'react-router-dom';
const Route = require('react-router-dom').Route;

/**
 * Main App builder
 * @return {Object} reactDOM
 */
function App() {
  const SERVER_DOMAIN=process.env.REACT_APP_SERVER_DOMAIN;
  const SERVER_KEY=process.env.REACT_APP_SERVER_KEY;
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log('Effect has been run');
  }, [counter]);

  const getData = async () => {
    const response = await fetch(`${SERVER_DOMAIN}/jobs`, {
      headers: {
        'apikey': SERVER_KEY,
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    login('username', 'password');
  };

  const login = async (username, password) => {
    const req = {
      username,
      password,
    };
    const response = await fetch(`${SERVER_DOMAIN}/login`, {
      method: 'POST',
      body: JSON.stringify(req),
    });
    const data = await response.json();
    console.log(data);
  };
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
      <Router>
        <main className="section">
          <Route path="/" render={
            () => (
              <>
                <h1 className="title">BeatCaps Admin Panel</h1>
                <form className="card" onSubmit={handleLoginSubmit}>
                  <fieldset className="card-content">
                    <legend className="title">Log in</legend>
                    <div className="field">
                      <label className="label" htmlFor="usernameInput">Username</label>
                      <div className="control">
                        <input id="usernameInput" className="input" type="text" name="username" required/>
                      </div>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="usernameInput">Password</label>
                      <div className="control">
                        <input id="passwordInput" className="input" type="password" name="password" required />
                      </div>
                    </div>
                  </fieldset>
                  <button className="button is-primary" type="submit">Submit</button>
                  <button onClick={() => setCounter(counter+1)} className="button is-secondary" type="button">Count: {counter}</button>
                </form>
              </>
            )
          } />
        </main>
      </Router>
    </div>
  );
}

export default App;
