import React from 'react';
import { Link } from 'react-router-dom';

const DashboardComponent = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/asset_types">Asset Types</Link></li>
      </ul>
    </div>
  )
};

export default DashboardComponent;
