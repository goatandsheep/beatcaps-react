import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import AuthButton from './AuthButton';

const NavMenu = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink className="navbar-item title is-6" to="/">BeatCaps Admin Panel</NavLink>
      </div>
      <div class="dropdown is-hoverable">
        <div class="dropdown-trigger">
          <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>Dropdown button</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a href="#" class="dropdown-item is-hoverable">
              Dropdown item
            </a>
            <a class="dropdown-item is-hoverable">
              Other dropdown item
            </a>
            <a href="#" class="dropdown-item is-hoverable">
              Active dropdown item
            </a>
            <a href="#" class="dropdown-item is-hoverable">
              Other dropdown item
            </a>
          </div>
        </div>
      </div>

      <div className="navbar-end">
        <AuthButton />
      </div>
    </nav>
  );
};
export default NavMenu;
