import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import AuthButton from './AuthButton';

const NavMenu = () => {
  return (
    <nav role="navigation" aria-label="main navigation">
      <div className="is-flex is-justify-content-space-between is-align-items-center is-flex-wrap-wrap mx-6 my-4">
        <div className="is-flex is-justify-content-flex-start is-align-items-center is-flex-wrap-wrap">
          <div className="mr-4">
            <NavLink className="title is-6" to="/">BeatCaps Admin Panel</NavLink>
          </div>
          
          <div>
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button class="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>Overleia</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <Link to="/" class="dropdown-item is-hoverable">
                    Overleia Outputs
                  </Link>
                  <hr class="dropdown-divider"></hr>
                  <Link to="/file/new" class="dropdown-item is-hoverable">
                    Upload Video
                  </Link>
                </div>
              </div>
            </div>

            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button class="button is-white" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>BeatCaps</span>
                  <span class="icon is-small">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <Link to="/" class="dropdown-item is-hoverable">
                    Video Outputs
                  </Link>
                  <hr class="dropdown-divider"></hr>
                  <Link to="/file/new" class="dropdown-item is-hoverable">
                    Upload Video
                  </Link>
                  <hr class="dropdown-divider"></hr>
                  <Link to="/templates" class="dropdown-item is-hoverable">
                    Templates List
                  </Link>
                  <Link to="/templates/new" class="dropdown-item is-hoverable">
                    Create Template
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="is-flex is-align-items-center">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
export default NavMenu;
