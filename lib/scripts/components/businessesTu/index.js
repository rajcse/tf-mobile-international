import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import Sticky from 'react-stickynode';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';
import {STATES} from '../../utils/states';

const BusinessesTu = (props) => {
	let { businesses } = props;
	return (
		<section id="businesses" className="widget premium">
			<Sticky>
				<h2 className="title">Possible Businesses</h2>
			</Sticky>
			{ businesses.map((business, index) => (
				<div className="document business-individual" key={index}>
					<div className="label label-full">
						<h3 className="document-title">{business.business_name}</h3>
					</div>
					{ _.get(business,'name.first') ?
						<SimpleRow
							content={business.name.first + ' ' + business.name.last}
							title="Name"
						/> : null
					}

					{ business.corporation_type ?
						<SimpleRow
							content={business.corporation_type}
							title="Corporation Type"
						/> : null
					}

					{ business.registration_type ?
						<SimpleRow
							content={business.registration_type}
							title="Business Registration Type"
						/> : null
					}

					{ _.get(business, 'incorporation_date.month') ?
						<SimpleRow
							content={constants.months[business.incorporation_date.month] + ', ' + business.incorporation_date.day + ' ' + business.incorporation_date.year}
							title="Incorporation Date"
						/> : null
					}

					{ business.business_duns_number ?
						<SimpleRow
							content={business.business_duns_number}
							title="Business ID"
						/> : null
					}

					{ _.get(business, 'address.display') ?
						<SimpleRow
							content={business.address.display}
							title="Address"
						/> : null
					}

					{ business.address_type ?
						<SimpleRow
							content={business.address_type}
							title="Address Type"
						/> : null
					}

					{ _.get(business, 'filing_date.month') ?
						<SimpleRow
							content={constants.months[business.filing_date.month] + ', ' + business.filing_date.day + ' ' + business.filing_date.year}
							title="Filing Date"
						/> : null
					}

					{ business.filing_number ?
						<SimpleRow
							content={business.filing_number}
							title="Filing Number"
						/> : null
					}

					{ _.get(business, 'verification_date.month') ?
						<SimpleRow
							content={constants.months[business.verification_date.month] + ', ' + business.verification_date.day + ' ' + business.verification_date.year}
							title="Verification Date"
						/> : null
					}

					{ business.incorporation_state ?
						<SimpleRow
							content={STATES[business.incorporation_state.toUpperCase()]}
							title="Incorporation State"
						/> : null
					}

					{ business.tax_board_status ?
						<SimpleRow
							content={business.tax_board_status}
							title="Tax Board Status"
						/> : null
					}

					{ business.sec_status ?
						<SimpleRow
							content={business.sec_status}
							title="SEC Status"
						/> : null
					}

					{ _.get(business, 'sec_state_status_date.month') ?
						<SimpleRow
							content={constants.months[business.sec_state_status_date.month] + ', ' + business.sec_state_status_date.day + ' ' + business.sec_state_status_date.year}
							title="SEC Status Date"
						/> : null
					}

					{ business.misc_details ?
						<SimpleRow
							content={business.misc_details}
							title="Misc. Details"
						/> : null
					}

					{business.business_contacts ?
						<div className="subgroup">
							<h3>Business Contacts</h3>
							{_.map(business.business_contacts, (contact) => {
								let name = _.get(contact, 'names[0].display', null);
								let title = _.get(contact, 'title', null);
								let address = _.get(contact, 'locations[0].address.display', null);

								return (
									<div key={uuid.v4()}>
										{ name ?
											<SimpleRow
												content={name}
												title="Name"
											/> : null
										}

										{ title ?
											<SimpleRow
												content={title}
												title="Title"
											/> : null
										}

										{ address ?
											<SimpleRow
												content={address}
												title="Address"
											/> : null
										}
									</div>
								);
							})}
						</div> : null 
					}

					{business.amendments ?
						<div className="subgroup">
							<h3>Amendments</h3>
							{_.map(business.amendments, (amendment) => {
								// amendment date isn't actually a date, more like a type
								let type = _.get(amendment, 'amendment_date', null);
								let date = _.get(amendment, 'filing_date.month', null);
								let reason = _.get(amendment, 'reason', null);

								return (
									<div key={uuid.v4()}>
										{ type ?
											<SimpleRow
												content={type}
												title="Type"
											/> : null
										}

										{ reason ?
											<SimpleRow
												content={reason}
												title="Reason"
											/> : null
										}

										{ date ?
											<SimpleRow
												content={constants.months[amendment.filing_date.month] + ', ' + amendment.filing_date.day + ' ' + amendment.filing_date.year}
												title="Filing Date"
											/> : null
										}
									</div>
								);
							})}
						</div> : null 
					}

				</div>
			)) }
		</section>
	);
};

BusinessesTu.propTypes = {
	businesses: React.PropTypes.array.isRequired
};

export default BusinessesTu;
