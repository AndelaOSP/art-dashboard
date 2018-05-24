import React from 'react';
import SidebarComponent from './SidebarComponent';
import NavbarComponent from './NavbarComponent';
import CardComponent from './CardComponent'
import PieChartComponent from './PieChartComponent';
import BarlineGraphComponent from './BarlineGraphComponent';
import statistics from '../_mock/statistics';

const DashboardComponent = () => {
  return (
    <div>
      <NavbarComponent />
      <CardComponent />
      <BarlineGraphComponent/>
      <PieChartComponent/>
    </div>
  )
};

export default DashboardComponent;
