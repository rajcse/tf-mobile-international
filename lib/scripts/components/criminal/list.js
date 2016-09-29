import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';
import {STATES} from '../../utils/states';
import uuid from 'uuid';

class CriminalRecordsList extends Component {
	render() {
		let { likelyCrimes, possibleCrimes, unlikelyCrimes, filteredCrimes, openCrime } = this.props;
		return (
			<div className="criminal-results simple-column" key={uuid.v4()}>
				{ filteredCrimes.map((matchType, index) => {
					return (
						<div className="row match-row">
							<div className="label">
								<h4>Likely Matches</h4>
							</div>
							<OwlCarousel slideSpeed={300} itemsCustom={[[0,1.25], [375, 1.5]]} navigation={false} autoHeight singleItem={false} autoPlay={false} >
								{ matchType.map((crime, index) => {
									
									let crimeType = crime.case_type_description
										? crime.case_type_description 
										: _.has(crime,'offenses[0].case_type')
											? crime.offenses[0].case_type
											: null;

									let crimeCity = crime.address && crime.address.city
										? crime.address.city
										: null;

									let crimeState = crime.address && crime.address.state
										? crime.address.state
										: crime.data_source_state
											? STATES[crime.data_source_state]
											: null;

									let crimeDate = _.has(crime,'offenses[0].offense_date') && crime.offenses[0].offense_date
										? crime.offenses[0].offense_date
										: crime.case_filing_date
											? crime.case_filing_date
											: null;

									return (
										<div key={index} className={classNames('criminal-card', crime.match_type)}>
											<h2 className="h4">{`${crime.name.first} ${crime.name.last}`}</h2>

											{ crimeCity && crimeState
												? <p>{crimeCity}, {crimeState}</p>
												: crimeState 
													? <p>{crimeState}</p>
													: null
											}

											{ crimeType 
												? <p>{crimeType}</p> 
												: null
											}

											{ crimeDate
												? <p>{moment(`${crimeDate.month}/${crimeDate.day}/${crimeDate.year}`, 'MM/DD/YYYY').format('ll')}</p>
												: null
											}

											<button onClick={ () => { openCrime(crime); } } className="btn btn-link">Case Details</button>
										</div>
									);
								})  }
							</OwlCarousel>
						</div>
					);
				})	}
			</div>
		);
	}
}

CriminalRecordsList.propTypes = {
	openCrime: React.PropTypes.func.isRequired,
	likelyCrimes: React.PropTypes.array.isRequired,
	possibleCrimes: React.PropTypes.array.isRequired,
	filteredCrimes: React.PropTypes.array.isRequired,
	unlikelyCrimes: React.PropTypes.array.isRequired
};

export default CriminalRecordsList;
