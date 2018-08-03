import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import { Divider } from 'semantic-ui-react';

Charts(FusionCharts);

export default class BarlineGraphComponent extends React.Component {
  myDataSource = {
    chart: {
      caption: 'Asset Financials',
      subcaption: '2018',
      xaxisname: 'Month',
      yaxisname: 'Amount (In USD)',
      numberprefix: '$',
      theme: 'ocean'
    },
    categories: [
      {
        category: [
          {
            label: 'Jan'
          },
          {
            label: 'Feb'
          },
          {
            label: 'Mar'
          },
          {
            label: 'Apr'
          },
          {
            label: 'May'
          },
          {
            label: 'Jun'
          },
          {
            label: 'Jul'
          },
          {
            label: 'Aug'
          },
          {
            label: 'Sep'
          },
          {
            label: 'Oct'
          },
          {
            label: 'Nov'
          },
          {
            label: 'Dec'
          }
        ]
      }
    ],
    dataset: [
      {
        seriesname: 'Cost of Purchase',
        data: [
          {
            value: '16000'
          },
          {
            value: '20000'
          },
          {
            value: '18000'
          },
          {
            value: '19000'
          },
          {
            value: '15000'
          },
          {
            value: '21000'
          },
          {
            value: '16000'
          },
          {
            value: '20000'
          },
          {
            value: '17000'
          },
          {
            value: '25000'
          },
          {
            value: '19000'
          },
          {
            value: '23000'
          }
        ]
      },
      {
        seriesname: 'Cost of Damages',
        renderas: 'line',
        showvalues: '0',
        data: [
          {
            value: '15000'
          },
          {
            value: '16000'
          },
          {
            value: '17000'
          },
          {
            value: '18000'
          },
          {
            value: '19000'
          },
          {
            value: '19000'
          },
          {
            value: '19000'
          },
          {
            value: '19000'
          },
          {
            value: '20000'
          },
          {
            value: '21000'
          },
          {
            value: '22000'
          },
          {
            value: '23000'
          }
        ]
      },
      {
        seriesname: 'Loss incurred',
        renderas: 'area',
        showvalues: '0',
        data: [
          {
            value: '4000'
          },
          {
            value: '5000'
          },
          {
            value: '3000'
          },
          {
            value: '4000'
          },
          {
            value: '1000'
          },
          {
            value: '7000'
          },
          {
            value: '1000'
          },
          {
            value: '4000'
          },
          {
            value: '1000'
          },
          {
            value: '8000'
          },
          {
            value: '2000'
          },
          {
            value: '7000'
          }
        ]
      }
    ]
  }
  chartConfigs = {
    id: 'multi_chart',
    type: 'mscombi2d',
    width: '45%',
    height: 400,
    dataFormat: 'json',
    dataSource: this.myDataSource,
  }

  render() {
    return (
      <div className="barlineGraph">
        <Divider hidden />
        <ReactFC {...this.chartConfigs} />
      </div>
    );
  }
}
