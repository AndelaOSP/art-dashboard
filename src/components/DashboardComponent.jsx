import React from 'react';
import CardComponent from './CardComponent';
import PieChartComponent from './PieChartComponent';
import BarlineGraphComponent from './BarlineGraphComponent';
import SideMenuComponent from '../_components/SideMenuComponent';
import statistics from '../_mock/statistics';

import '../_css/DashboardComponent.css';

const DashboardComponent = () => (
  <div>
    <SideMenuComponent title="Dashboard">
      <CardComponent statistics={statistics} />
      <div className="chartArea">
        <BarlineGraphComponent />
        <PieChartComponent statistics={statistics} />
      </div>
    </SideMenuComponent>
  </div>
);

export default DashboardComponent;
