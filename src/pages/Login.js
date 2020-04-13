import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../contexts/GlobalState';

/**
 * Login page component
 * @return {Object} reactDom
 */
const Login = () => {
  const context = useContext(GlobalContext);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log('Effect has been run');
  }, [counter]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    context.login('username', 'password');
  };
  return (
    <>
      <h1 className="title">BeatCaps Admin Panel</h1>
      <form className="card" onSubmit={handleLoginSubmit}>
        <fieldset className="card-content">
          <legend className="title">Log in</legend>
          <div className="field">
            <label className="label" htmlFor="usernameInput">Username</label>
            <div className="control has-icons-left">
              <input id="usernameInput" className="input" type="text" name="username" required/>
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="usernameInput">Password</label>
            <div className="control has-icons-left">
              <input id="passwordInput" className="input" type="password" name="password" required />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
          </div>
        </fieldset>
        <button className="button is-primary" type="submit">Submit</button>
        <button onClick={() => setCounter(counter+1)} className="button is-secondary" type="button">Count: {counter}</button>
      </form>
    </>
  );
};
export default Login;
