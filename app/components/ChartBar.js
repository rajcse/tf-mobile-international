import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import uuid from 'uuid';
import { Bar } from 'react-chartjs-2';

export default class ChartBar extends Component {
	render() {
		let { data } = this.props;
		let charts = [];

		const label = data.summary_chart.years;
		const violentCrime = data.summary_chart.violent_crimes;
		const robbery = data.summary_chart.robbery;
		const rape = data.summary_chart.forcible_rape;

		let chartData, chartColor, chartHover;

		function createObject(data, index) {
			if (index === 0) {
				chartColor = 'rgba(186, 242, 223, .8)';
				chartHover = 'rgba(186, 242, 223, 1)';
			} else if (index === 1) {
				chartColor = 'rgba(208, 83, 83, .8)';
				chartHover = 'rgba(208, 83, 83, 1)';
			} else {
				chartColor = 'rgba(248, 186, 47, .8)';
				chartHover = 'rgba(248, 186, 47, 1)';
			}

			return {
				label: data[0],
				backgroundColor: chartColor,
				borderColor: chartHover,
				borderWidth: 1,
				hoverBackgroundColor: chartHover,
				hoverBorderColor: chartHover,
				data: _.tail(data)
			};
		}

		// Forcible Rape Chart
		if (!_.isEmpty(rape)) {
			let dataSet = _.map(rape, createObject);

			chartData = {
				labels: label,
				datasets: dataSet
			};

			charts.push(
				<div className="chart-container" key={`chart-${uuid.v4()}`}>
					<p>Sexual Assault</p>
					<Bar data={chartData} height={175} />
				</div>
			);
		}

		// Violent Crime Chart
		if (!_.isEmpty(violentCrime)) {
			let dataSet = _.map(violentCrime, createObject);

			chartData = {
				labels: label,
				datasets: dataSet
			};

			charts.push(
				<div className="chart-container" key={`chart-${uuid.v4()}`}>
					<p>Violent Crime</p>
					<Bar data={chartData} height={175} />
				</div>
			);
		}

		// Robbery Chart
		if (!_.isEmpty(robbery)) {
			let dataSet = _.map(robbery, createObject);

			chartData = {
				labels: label,
				datasets: dataSet
			};

			charts.push(
				<div className="chart-container" key={`chart-${uuid.v4()}`}>
					<p>Theft</p>
					<Bar data={chartData} height={175} />
				</div>
			);
		}


		return (
			<div className="chart-wrapper">
				<div className="label">
					<h4>Census Data</h4>
				</div>
				{charts}
			</div>
		);
	}
}

ChartBar.propTypes = {
	data: PropTypes.object.isRequired
};
