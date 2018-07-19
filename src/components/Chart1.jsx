import React from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart,
  withHighcharts,
  Chart,
  Legend,
  XAxis,
  YAxis,
  AreaSeries
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
const Chart1 = () => (
  <div className="graph-section">
    <HighchartsChart plotOptions={plotOptions} >
      <Chart style={{ height: '341px', width: '310px' }} />

      <Legend />
      <XAxis />
      <YAxis id="number">
        <AreaSeries id="damaged" name="Damaged" data={[34, 45, 55, 56]} />
        <AreaSeries id="lost" name="Lost" data={[2, 17, 36, 46]} />
        <AreaSeries id="allocated" name="Allocated" data={[12, 24, 36, 48]} />
        <AreaSeries id="available" name="Available" data={[100, 50, 70, 67]} />
      </YAxis>
    </HighchartsChart>
  </div>
);
export default withHighcharts(Chart1, Highcharts);
