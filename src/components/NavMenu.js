import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import AuthButton from './AuthButton';
import constants from '../constants';
const {version} = require('../../package.json');

const navButtonStyles = {
  width: 'auto',
  paddingLeft: '0',
  paddingRight: '0',
};

const BeatCapsNav = () => (
  <div className="dropdown-trigger">
    <button className="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Beatcaps</span>
      <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
  </div>
);

const NavMenu = () => {
  return (
    <nav role="navigation" aria-label="main navigation">
      <div className="is-flex is-justify-content-space-between is-align-items-center is-flex-wrap-wrap mx-6 my-4">
        <div className="is-flex is-justify-content-flex-start is-align-items-center is-flex-wrap-wrap">
          <div className="mr-4">
            <NavLink className="title is-6" to="/">Video Admin Panel</NavLink>
          </div>

          <div>
            <div className="dropdown is-hoverable">
              {constants.SHOW_BEATCAPS && <BeatCapsNav/>}
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <Link to="/file/use" className="dropdown-item is-hoverable" style={navButtonStyles}>
                    Create cues
                  </Link>
                  <Link to="/file/new" className="dropdown-item is-hoverable" style={navButtonStyles}>
                    Upload Video
                  </Link>
                </div>
              </div>
            </div>

            <div className="dropdown is-hoverable">
              <div className="dropdown-trigger">
                <button className="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>Overleia</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <Link to="/" className="dropdown-item is-hoverable" style={navButtonStyles}>
                    Video Outputs
                  </Link>
                  <hr className="dropdown-divider"></hr>
                  <Link to="/file/new" className="dropdown-item is-hoverable" style={navButtonStyles}>
                    Upload Video
                  </Link>
                  <hr className="dropdown-divider"></hr>
                  <Link to="/templates" className="dropdown-item is-hoverable" style={navButtonStyles}>
                    Templates List
                  </Link>
                  <Link to="/templates/new" className="dropdown-item is-hoverable" style={navButtonStyles}>
                    Create Template
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="is-flex is-align-items-center">
          <span>v{version}&nbsp;</span>
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
export default NavMenu;
