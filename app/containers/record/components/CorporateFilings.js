import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import Sticky from 'react-stickynode';
import constants from 'constants/pubRecConstants';
import SimpleRow from 'components/SimpleRow';
import {STATES} from 'utils/states';

const CorporateFilings = (props) => {
	let { corporateFilings } = props;
	return (
		<section id="corporate-filings" className="widget premium">
			<Sticky>
				<h2 className="title">Corporate Filings</h2>
			</Sticky>
			{ corporateFilings.map((corporateFiling, index) => (
				<div className="document corporate-filing-individual" key={index}>
					<div className="label label-full">
						<h3 className="document-title">{corporateFiling.business_name}</h3>
					</div>
					{ _.get(corporateFiling,'name.first') ?
						<SimpleRow
							content={corporateFiling.name.first + ' ' + corporateFiling.name.last}
							title="Name"
						/> : null
					}

					{ corporateFiling.corporation_type ?
						<SimpleRow
							content={corporateFiling.corporation_type}
							title="Corporation Type"
						/> : null
					}

					{ corporateFiling.registration_type ?
						<SimpleRow
							content={corporateFiling.registration_type}
							title="Business Registration Type"
						/> : null
					}

					{ _.get(corporateFiling, 'incorporation_date.month') ?
						<SimpleRow
							content={constants.months[corporateFiling.incorporation_date.month] + ', ' + corporateFiling.incorporation_date.day + ' ' + corporateFiling.incorporation_date.year}
							title="Incorporation Date"
						/> : null
					}

					{ corporateFiling.business_duns_number ?
						<SimpleRow
							content={corporateFiling.business_duns_number}
							title="Business ID"
						/> : null
					}

					{ _.get(corporateFiling, 'address.display') ?
						<SimpleRow
							content={corporateFiling.address.display}
							title="Address"
						/> : null
					}

					{ corporateFiling.address_type ?
						<SimpleRow
							content={corporateFiling.address_type}
							title="Address Type"
						/> : null
					}

					{ _.get(corporateFiling, 'filing_date.month') ?
						<SimpleRow
							content={constants.months[corporateFiling.filing_date.month] + ', ' + corporateFiling.filing_date.day + ' ' + corporateFiling.filing_date.year}
							title="Filing Date"
						/> : null
					}

					{ corporateFiling.filing_number ?
						<SimpleRow
							content={corporateFiling.filing_number}
							title="Filing Number"
						/> : null
					}

					{ _.get(corporateFiling, 'verification_date.month') ?
						<SimpleRow
							content={constants.months[corporateFiling.verification_date.month] + ', ' + corporateFiling.verification_date.day + ' ' + corporateFiling.verification_date.year}
							title="Verification Date"
						/> : null
					}

					{ corporateFiling.incorporation_state ?
						<SimpleRow
							content={STATES[corporateFiling.incorporation_state.toUpperCase()]}
							title="Incorporation State"
						/> : null
					}

					{ corporateFiling.tax_board_status ?
						<SimpleRow
							content={corporateFiling.tax_board_status}
							title="Tax Board Status"
						/> : null
					}

					{ corporateFiling.sec_status ?
						<SimpleRow
							content={corporateFiling.sec_status}
							title="SEC Status"
						/> : null
					}

					{ _.get(corporateFiling, 'sec_state_status_date.month') ?
						<SimpleRow
							content={constants.months[corporateFiling.sec_state_status_date.month] + ', ' + corporateFiling.sec_state_status_date.day + ' ' + corporateFiling.sec_state_status_date.year}
							title="SEC Status Date"
						/> : null
					}

					{ corporateFiling.misc_details ?
						<SimpleRow
							content={corporateFiling.misc_details}
							title="Misc. Details"
						/> : null
					}

					{corporateFiling.business_contacts ?
						<div className="subgroup">
							<h3>Business Contacts</h3>
							{_.map(corporateFiling.business_contacts, (contact) => {
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

					{corporateFiling.amendments ?
						<div className="subgroup">
							<h3>Amendments</h3>
							{_.map(corporateFiling.amendments, (amendment) => {
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

CorporateFilings.propTypes = {
	corporateFilings: React.PropTypes.array.isRequired
};

export default CorporateFilings;
