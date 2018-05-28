import React from 'react';
import { Link } from 'react-router-dom';

const DashboardComponent = () => {
  return (
    <div>
      <NavbarComponent />
      <CardComponent statistics={statistics}/>
      <BarlineGraphComponent/>
      <PieChartComponent/>
    </div>
  )
};

export default DashboardComponent;
