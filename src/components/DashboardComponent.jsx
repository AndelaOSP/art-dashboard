import React from 'react';
import SidebarComponent from './SidebarComponent';
import NavbarComponent from './NavbarComponent';
import CardComponent from './CardComponent'
import PieChartComponent from './PieChartComponent';
import BarlineGraphComponent from './BarlineGraphComponent';
import statistics from '../_mock/statistics';

import '../_css/DashboardComponenet.css';

const DashboardComponent = () => {
  return (
    <div>
      <NavbarComponent />
      <CardComponent statistics={statistics} />
      <div className="chartArea">
        <BarlineGraphComponent />
        <PieChartComponent />
      </div>
    </div>
  )
};

export default DashboardComponent;
