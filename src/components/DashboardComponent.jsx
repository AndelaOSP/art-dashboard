import React from 'react';
import { Link } from 'react-router-dom';

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
