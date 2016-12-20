import React from 'react';
import _ from 'lodash';
import constants from 'constants/pubRecConstants';
import SimpleRow from 'components/SimpleRow';
import { STATES } from 'utils/states';
import firebaseClient from 'utils/firebaseClient';

const Businesses = (props) => {
	let {
		businesses,
		isPremium,
		name
	} = props;

	const showPremiumUpsell = () => {
		props.showPremiumUpsell();
		firebaseClient.logEvent('premium_upsell_trigger', {trigger_category: 'user', trigger_element: 'Businesses.button'});
	};

	if (!isPremium) {
		return (
			<section id="businesses" className="widget">
				<h2 className="title">Business Information</h2>

				<div className="document">
					<div className="label">
						<h4>Additional Info</h4>
					</div>

					<p>Some info is so sensitive we can only reveal it on a Per-Report Basis. Click the button below to have access to available business information on {name}.</p>

					<p>
						<button className="btn btn-upgrade" onClick={showPremiumUpsell}>View Premium Data</button>
					</p>
				</div>
			</section>
		);
	}

	if (isPremium && businesses.length === 0) {
		return null;
	}

	return (
		<section id="businesses" className="widget premium">
			<h2 className="title">Possible Businesses</h2>
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

					{ business.company_names && business.company_names.length &&
						<SimpleRow
							content={business.company_names[0].name}
							title="Company Name"
						/> }

					{ business.corporation_number &&
						<SimpleRow
							content={business.corporation_number}
							title="Corporation Number"
						/> }

					{ business.business_ids && business.business_ids.duns_number &&
						<SimpleRow
							content={business.business_ids.duns_number}
							title="DUNS Number"
						/> }

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
							content={`${constants.months[business.record_date.month]} ${business.record_date.day}, ${business.record_date.year}`}
							title="Record Date"
						/> : null
					}

					{ _.get(business, 'filing_date.month') ?
						<SimpleRow
							content={`${constants.months[business.filing_date.month]} ${business.filing_date.day}, ${business.filing_date.year}`}
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
	businesses: React.PropTypes.array,
	isPremium: React.PropTypes.bool,
	name: React.PropTypes.string,
	showPremiumUpsell: React.PropTypes.func
};

export default Businesses;
