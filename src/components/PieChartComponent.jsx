import React, { Component } from 'react';
import ReactFC from 'react-fusioncharts';
import { Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class PieChartComponent extends Component {
  statistics = this.props.statistics;
  myDataSource = {
    chart: {
      caption: 'Asset Statistics',
      subCaption: 'Assets status breakdown',
    },
    data: this.statistics,
  }

  chartConfigs = {
    id: 'pie_chart',
    type: 'pie2d',
    width: '35%',
    height: 400,
    dataFormat: 'json',
    dataSource: this.myDataSource,
  }

  render() {
    return (
      <div className="pieChartGraph">
        <Divider hidden />
        <ReactFC {...this.chartConfigs} />
      </div>
    );
  }
}

PieChartComponent.propTypes = {
  statistics: PropTypes.arrayOf(PropTypes.object)
};

PieChartComponent.defaultProps = {
  statistics: []
};
