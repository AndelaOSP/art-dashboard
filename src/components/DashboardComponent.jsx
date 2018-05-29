import React from 'react';
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
        <PieChartComponent statistics={statistics}/>
      </div>
    </div>
  )
};

export default DashboardComponent;
