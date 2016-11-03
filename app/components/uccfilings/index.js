import React from 'react';
import _ from 'lodash';
import uuid from 'uuid';
import Sticky from 'react-stickynode';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';
import SimpleInline from '../shared/SimpleInline';
import {STATES} from '../../utils/states';

function getFileDate(date) {
	if(_.isNull(date)) {
		return 'UCC Filing';
	}

	let formattedDate = constants.months[date.month] + ' ' + date.day + ' ' + date.year;

	return `Initial Filing Date - ${formattedDate}`;
}

const UccFilings = (props) => {
	let { uccFilings } = props;
	return (
		<section id="uccfilings" className="widget premium">
			<Sticky>
				<h2 className="title">Possible UCC Filings</h2>
			</Sticky>
			{ uccFilings.map((uccfiling, index) => (
				<div className="document uccfiling-individual" key={index}>
					<div className="label label-full">
						<h3 className="document-title">{getFileDate(uccfiling.origin_filing_date)}</h3>
					</div>

					{ uccfiling.filing_jurisdiction_name ?
						<SimpleRow
							key={uuid.v4()}
							content={uccfiling.filing_jurisdiction_name}
							title="Filing Jurisdiction"
						/> : null 
					}

					{ _.get(uccfiling,'filing_offices[0].filing_agency') ?
						<SimpleRow
							key={uuid.v4()}
							content={uccfiling.filing_offices[0].filing_agency}
							title="Filing Agency"
						/> : null 
					}

					{ _.get(uccfiling,'filing_offices[0].address.street_address1') ?
						<SimpleRow
							key={uuid.v4()}
							content={
								uccfiling.filing_offices[0].address.street_address1 + ' ' +
								uccfiling.filing_offices[0].address.city + ' ' +
								uccfiling.filing_offices[0].address.state + ', ' +
								uccfiling.filing_offices[0].address.zip5 
							}
							title="Filing Agency Address"
						/> : null 
					}

					{ _.get(uccfiling,'filing_offices[0].address') && !_.get(uccfiling,'filing_offices[0].address.street_address1') ?
						<SimpleRow
							key={uuid.v4()}
							content={
								uccfiling.filing_offices[0].address.street_number + ' ' +
								uccfiling.filing_offices[0].address.street_pre_direction + ' ' +
								uccfiling.filing_offices[0].address.street_name + ' ' +
								uccfiling.filing_offices[0].address.street_post_direction + ' ' +
								uccfiling.filing_offices[0].address.street_suffix + ' ' +
								uccfiling.filing_offices[0].address.city + ' ' +
								uccfiling.filing_offices[0].address.state + ', ' +
								uccfiling.filing_offices[0].address.zip5 
							}
							title="Filing Agency Address"
						/> : null 
					}

					{ uccfiling.filings ?
						<div className="subgroup">
							<h3>Filings</h3>
							{ uccfiling.filings.map((filing) => (
								<div className="filing" key={uuid.v4()}>
									{ filing.type ?
										<SimpleRow
											key={uuid.v4()}
											title="Filing Type"
											content={filing.type}
										/> :null 
									}
									{ _.get(filing, 'date.month') ?
										<SimpleRow
											key={uuid.v4()}
											title="Filing Date"
											content={constants.months[filing.date.month] + ' ' + filing.date.day + ' ' + filing.date.year}
										/> :null 
									}

									{ _.get(filing, 'expiration_date.month') ?
										<SimpleRow
											key={uuid.v4()}
											title="Expiration Date"
											content={constants.months[filing.expiration_date.month] + ' ' + filing.expiration_date.day + ' ' + filing.expiration_date.year}
										/> :null 
									}

									{ filing.number ?
										<SimpleRow
											key={uuid.v4()}
											title="Filing Number"
											content={filing.number}
										/> :null 
									}

								</div>
							))}
						</div> : null 
					}


					{ uccfiling.debtors ?
						<div className="subgroup">
							<h3>Debtors</h3>
							{ uccfiling.debtors.map((debtor) => (
								<div className="debtor" key={uuid.v4()}>
									{ debtor.origin_name ?
										<SimpleRow
											key={uuid.v4()}
											title={_.get(debtor, 'parsed_parties[0].business_id') ? "Business Name" : "Name"}
											content={debtor.origin_name}
										/> :null 
									}

									{ _.get(debtor, 'addresses[0]') ?
										<SimpleRow
											key={uuid.v4()}
											title="Address"
											content={
												debtor.addresses[0].street_number + ' ' +
												debtor.addresses[0].street_pre_direction + ' ' +
												debtor.addresses[0].street_name + ' ' +
												debtor.addresses[0].street_post_direction + ' ' +
												debtor.addresses[0].street_suffix + ' ' +
												debtor.addresses[0].city + ' ' +
												debtor.addresses[0].state + ', ' +
												debtor.addresses[0].zip5 
											}
										/> :null 
									}
								</div>
							))}
						</div> : null 
					}

					{ uccfiling.secureds ?
						<div className="subgroup">
							<h3>Lenders</h3>
							{ uccfiling.secureds.map((lender) => (
								<div className="lender" key={uuid.v4()}>
									{ lender.origin_name ?
										<SimpleRow
											key={uuid.v4()}
											title="Name"
											content={lender.origin_name}
										/> :null 
									}

									{ _.get(lender, 'addresses[0]') ?
										<SimpleRow
											key={uuid.v4()}
											title="Address"
											content={
												lender.addresses[0].street_number + ' ' +
												lender.addresses[0].street_pre_direction + ' ' +
												lender.addresses[0].street_name + ' ' +
												lender.addresses[0].street_post_direction + ' ' +
												lender.addresses[0].street_suffix + ' ' +
												lender.addresses[0].city + ' ' +
												lender.addresses[0].state + ', ' +
												lender.addresses[0].zip5 
											}
										/> :null 
									}
								</div>
							))}
						</div> : null 
					}

					{ uccfiling.collaterals ?
						<div className="subgroup">
							<h3>Collaterals</h3>
							{ uccfiling.collaterals.map((collateral) => (
								<div className="collaterals" key={uuid.v4()}>
									{ collateral.description ?
										<SimpleRow
											key={uuid.v4()}
											title="Description"
											content={collateral.description}
										/> :null 
									}


								</div>
							))}
						</div> : null 
					}

				</div>
			)) }
		</section>
	);
};

UccFilings.propTypes = {
	uccfilings: React.PropTypes.array.isRequired
};

export default UccFilings;
