import React, { Component } from 'react';

export default class PossibleOwner extends Component {
	render() {
		let {
			name,
			age,
			location
		} = this.props;

		return (
			<div className="report-header">
				<div className="report-container">
					<div className="report-thumbnail">
						<img src="//placehold.it/70x70" />
					</div>
					<div className="report-brief">
						<h1>Possible Owner: {name}</h1>
						<p>{ age ? <span>{age} -</span> : null } { location }</p>
					</div>
				</div>
			</div>
		);
	}
}

PossibleOwner.propTypes = {
	name: React.PropTypes.string,
	age: React.PropTypes.number,
	location: React.PropTypes.string
};
