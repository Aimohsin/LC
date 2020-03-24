import React, { Component } from 'react'

export default class Sidebar extends Component {

    render() {
        return (
            <div>
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <a href="/" className="brand-link">
      <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
      <span className="brand-text font-weight-light">Trainer Platform</span>
    </a>
    <div className="sidebar">
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-header"></li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              <i className="nav-icon fas fa-file" />
              <p>Signin</p>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</div>
        )
    }
}
