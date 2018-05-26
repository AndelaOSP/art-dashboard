import React from 'react';
import CardComponent from './CardComponent'
import PieChartComponent from './PieChartComponent';
import BarlineGraphComponent from './BarlineGraphComponent';
import SideMenuComponent from '../_components/SideMenuComponent';
import statistics from '../_mock/statistics';
import { Link } from 'react-router-dom';

import '../_css/DashboardComponent.css';

const DashboardComponent = () => {
  return (
    <div>
    <SideMenuComponent>
      <CardComponent statistics={statistics} />
      <div className="chartArea">
        <BarlineGraphComponent />
        <PieChartComponent statistics={statistics} />
      </div>
      </SideMenuComponent>
      <h1>Dashboard</h1>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/asset_types">Asset Types</Link></li>
      </ul>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/feedback">Feedback</Link></li>
      </ul>
    </div>
  )
};

export default DashboardComponent;
