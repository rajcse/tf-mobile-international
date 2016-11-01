import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import Sticky from 'react-stickynode';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';
import {STATES} from '../../utils/states';

const Businesses = (props) => {
	let { businesses } = props;
	return (
		<section id="businesses" className="widget premium">
			<Sticky>
				<h2 className="title">Possible Businesses</h2>
			</Sticky>
			{ businesses.map((business, index) => (
				<div className="document business-individual" key={index}>
					<div className="label label-full">
						<h3 className="document-title">{business.company_name}</h3>
					</div>
					{ _.get(business,'name.first') ?
						<SimpleRow
							content={business.name.first + ' ' + business.name.last}
							title="Name"
						/> : null
					}

					{ business.corporation_number ?
						<SimpleRow
							content={business.corporation_number}
							title="Corporation Number"
						/> : null
					}

					{ _.get(business, 'address.display') ?
						<SimpleRow
							content={business.address.display}
							title="Address"
						/> : null
					}

					{ business.title ?
						<SimpleRow
							content={business.title}
							title="Title"
						/> : null
					}

					{ business.status_description ?
						<SimpleRow
							content={business.status_description}
							title="Status"
						/> : null
					}

					{ _.get(business, 'record_date.month') ?
						<SimpleRow
							content={constants.months[business.record_date.month] + ', ' + business.record_date.day + ' ' + business.record_date.year}
							title="Record Date"
						/> : null
					}

					{ _.get(business, 'filing_date.month') ?
						<SimpleRow
							content={constants.months[business.filing_date.month] + ', ' + business.filing_date.day + ' ' + business.filing_date.year}
							title="Filing Date"
						/> : null
					}

					{ business.state ?
						<SimpleRow
							content={STATES[business.state]}
							title="State"
						/> : null
					}

				</div>
			)) }
		</section>
	);
};

Businesses.propTypes = {
	businesses: React.PropTypes.array.isRequired
};

export default Businesses;
