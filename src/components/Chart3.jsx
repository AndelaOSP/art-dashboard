import React from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart,
  withHighcharts,
  Chart,
  Legend,
  XAxis,
  YAxis,
  PieSeries
} from 'react-jsx-highcharts';

const plotOptions = {
  area: {
    stacking: 'stream',
    lineColor: '#666666',
    lineWidth: 1,
    marker: {
      lineWidth: 1,
      lineColor: '#666666'
    }
  }
};
const pieData = [
  {
    name: 'Damaged',
    y: 13
  }, {
    name: 'Lost',
    y: 23
  }, {
    name: 'Allocated',
    y: 19
  }, {
    name: 'Available',
    y: 32
  }
];
const Chart3 = () => (
  <div className="graph-section">
    <HighchartsChart plotOptions={plotOptions} >
      <Chart style={{ height: '400px', width: '400px' }} />

      <Legend />
      <XAxis categories={['Damaged', 'Lost', 'Allocated', 'Available']} />
      <YAxis id="number">
        <PieSeries showInLegend={false} data={pieData} />
      </YAxis>
    </HighchartsChart>
  </div>
);
export default withHighcharts(Chart3, Highcharts);
