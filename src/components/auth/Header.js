import React, { Component } from 'react';

const Header = (props) => {
    return (
        <div>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
            <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars" /></a>
            </li>
        </ul>
        </nav>
    </div>
    )
  }

  export default Header
