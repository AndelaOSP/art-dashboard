import React from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart,
  withHighcharts,
  Chart,
  Legend,
  XAxis,
  YAxis,
  ColumnSeries
} from 'react-jsx-highcharts';

import '../_css/DashboardComponent.css';

const plotOptions = {
  column: {
    pointPadding: 0.2,
    borderWidth: 0
  }
};

const categories = ['10%', '25%', '50%', '85%'];

const Chart2 = () => (
  <div className="graph-section">
    <HighchartsChart plotOptions={plotOptions}>
      <Chart style={{ height: '400px', width: '400px' }} />

      <Legend />
      <XAxis id="x" categories={categories} />
      <YAxis id="number">
        <ColumnSeries id="10p" name="10%" data={[3, 5, 7, 9]} />
        <ColumnSeries id="25p" name="25%" data={[2, 7, 9, 12]} />
        <ColumnSeries id="50p" name="50%" data={[4, 8, 8, 6]} />
        <ColumnSeries id="85p" name="85%" data={[3, 6, 7, 9]} />
      </YAxis>
    </HighchartsChart>
  </div>
);
export default withHighcharts(Chart2, Highcharts);
