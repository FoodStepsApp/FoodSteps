import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/statwig_logo.png';

const Navbar = props => (
  <ul
    className="navbar-nav bg-black sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <Link
      className="sidebar-brand d-flex align-items-center justify-content-center"
      to="/overview"
    >
      <div className="sidebar-brand-text mx-3">
        <img src={logo} width={220} height={60}/>
      </div>
    </Link>

    <hr className="sidebar-divider my-0" />

    <li className={`nav-item ${props.selectedTab === 'overview' ? 'active' : ''}`}>
      <Link className="nav-link" to="/overview">
        <i className="fas fa-fw fa-th" />
        <span>Overview</span>
      </Link>
    </li>

    <li className={`nav-item ${props.selectedTab === 'shipping' ? 'active' : ''}`}>
      <Link className="nav-link" to="/shipping">
        <i className="fas fa-fw fa-truck" />
        <span>Shipping</span>
      </Link>
    </li>

    <li className={`nav-item ${props.selectedTab === 'inventory' ? 'active' : ''}`}>
      <Link className="nav-link" to="/inventory">
        <i className="fas fa-chart-pie" />
        <span>Inventory</span>
      </Link>
    </li>

    <hr className="sidebar-divider" />
    <li className={`nav-item ${props.selectedTab === 'profile' ? 'active' : ''}`}>
      <Link className="nav-link" to="/profile">
        <i className="fas fa-fw fa-user" />
        <span>Profile</span>
      </Link>
    </li>
    <hr className="sidebar-divider" />
    <li className={`nav-item ${props.selectedTab === 'products' ? 'active' : ''}`}>
      <Link className="nav-link" to="/products">
        <i className="fa fa-product-hunt" />
        <span>Products</span>
      </Link>
    </li>
    <hr className="sidebar-divider" />
    <li className="nav-item">
      <Link className="nav-link" to="/login">
        <i className="fa fa-stop-circle" />
        <span>Logout</span>
      </Link>
    </li>

    <hr className="sidebar-divider d-none d-md-block" />
  </ul>
);

export default Navbar;
