import React from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import { Divider } from 'semantic-ui-react';

Charts(FusionCharts);

export default class PieChartComponent extends React.Component {

    myDataSource = {
        chart: {
            caption: 'Harry\'s SuperMart',
            subCaption: 'Top 5 stores in last month by revenue',
            numberPrefix: '$',
        },
        data: [
            {
                label: 'Bakersfield Central',
                value: '880000',
            },
            {
                label: 'Garden Groove harbour',
                value: '730000',
            },
            {
                label: 'Los Angeles Topanga',
                value: '590000',
            },
            {
                label: 'Compton-Rancho Dom',
                value: '520000',
            },
            {
                label: 'Daly City Serramonte',
                value: '330000',
            },
        ],
    }

    chartConfigs = {
        id: 'pie_chart',
        type: 'pie2d',
        width: '30%',
        height: 300,
        dataFormat: 'json',
        dataSource: this.myDataSource,
    }

    render() {
        return (
            <div>
                <Divider hidden/>
                <ReactFC {...this.chartConfigs} />
            </div>
        )
    }

}