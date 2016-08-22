import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import moment from 'moment';

import _ from 'lodash';

class CriminalRecordsList extends Component {
	render() {
		let { crimes, openCrime } = this.props;

		// Filter Crimes only with location details
		crimes = _.filter(crimes, ['address', {}]);

		return (
			<div className="criminal-results simple-column row">
				<div className="label">
					<h4>Best Match</h4>
				</div>

				<OwlCarousel slideSpeed={300} itemsCustom={[[0,1.25], [375, 1.5]]} navigation={false} autoHeight singleItem={false} autoPlay={false} >
					{ crimes.map((crime, index) => {
						return (
							<div key={index} className="criminal-card">
								<h2 className="h4">{`${crime.name.first} ${crime.name.last}`}</h2>

								{ _.has(crime, 'address.city') && !_.isEmpty(crime.address.city) && _.has(crime, 'address.state_code') ?
									<p>{`${crime.address.city}, ${crime.address.state_code}`}</p>
								: null }

								{ _.has(crime, 'offenses[0].arrest.date') && !_.isNull(crime.offenses[0].arrest.date)?
									<p>{moment(`${crime.offenses[0].arrest.date.month}/${crime.offenses[0].arrest.date.day}/${crime.offenses[0].arrest.date.year}`, 'MM/DD/YYYY').format('ll')}</p>
								: null }

								<button onClick={ () => { openCrime(crime); } } className="btn btn-link">Case Details</button>
							</div>
						);
					}) }
				</OwlCarousel>
			</div>
		);
	}
}

CriminalRecordsList.propTypes = {
	openCrime: React.PropTypes.func.isRequired,
	crimes: React.PropTypes.array.isRequired
};

export default CriminalRecordsList;
