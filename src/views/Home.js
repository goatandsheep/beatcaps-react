import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext';

/**
 * Home page component
 * @return {Object} reactDom
 */
const Home = () => {
  const {SERVER_DOMAIN} = useContext(AppContext);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log('Effect has been run');
  }, [counter]);

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
  );
};
export default Home;
