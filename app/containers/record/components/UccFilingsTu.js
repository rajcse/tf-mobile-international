import React from 'react';
import _ from 'lodash';
import uuid from 'uuid';
import constants from 'constants/pubRecConstants';
import SimpleRow from 'components/SimpleRow';

function getFileDate(date) {
	if(_.isNull(date)) {
		return 'UCC Filing';
	}

	let formattedDate = constants.months[date.month] + ' ' + date.day + ' ' + date.year;

	return `Initial Filing Date - ${formattedDate}`;
}

const UccFilingsTu = (props) => {
	return (
		<section id="uccfilings" className="widget premium">
			<h2 className="title">Possible UCC Filings</h2>
			{ props.uccFilingsTu.map((uccFiling, index) => (
				<div className="document uccfiling-individual" key={index}>
					<div className="label label-full">
						<h3 className="document-title">{getFileDate(uccFiling.filing_date)}</h3>
					</div>

					{ uccFiling.filing_number &&
						<SimpleRow
							content={uccFiling.filing_number}
							title="Filing Number"
						/>
					}

					{ uccFiling.filing_type &&
						<SimpleRow
							content={uccFiling.filing_type}
							title="Filing Type"
						/>
					}

					{ uccFiling.filing_office_name &&
						<SimpleRow
							content={uccFiling.filing_office_name}
							title="Filing Office Name"
						/>
					}

					{ _.get(uccFiling, 'filing_office_address.display') &&
						<SimpleRow
							content={uccFiling.filing_office_address.display}
							title="Filing Office Address"
						/>
					}

					{ uccFiling.expiration_date &&
						<SimpleRow
							content={`${constants.months[uccFiling.expiration_date.month]} ${uccFiling.expiration_date.day} ${uccFiling.expiration_date.year}`}
							title="Expiration Date"
						/>
					}

					{ uccFiling.collateral_items &&
						<div className="subgroup">
							<h3>Collateral Items</h3>
							{ uccFiling.collateral_items.map((collateral) => (
								<div className="filing" key={uuid.v4()}>
									{ collateral.type &&
										<SimpleRow
											title="Type"
											content={collateral.type}
										/>
									}
								</div>
							))}
						</div>
					}


					{ uccFiling.debtors &&
						<div className="subgroup">
							<h3>Debtors</h3>
							{ uccFiling.debtors.map((debtor) => (
								<div className="debtor" key={uuid.v4()}>
									{ debtor.name &&
										<SimpleRow
											title="Name"
											content={debtor.name}
										/>
									}

									{ debtor.business_name &&
										<SimpleRow
											title="Business Name"
											content={debtor.business_name}
										/>
									}

									{ _.get(debtor, 'address.display') &&
										<SimpleRow
											title="Address"
											content={debtor.address.display}
										/>
									}
								</div>
							))}
						</div>
					}

					{ uccFiling.secured_parties &&
						<div className="subgroup">
							<h3>Lenders</h3>
							{ uccFiling.secured_parties.map((lender) => (
								<div className="lender" key={uuid.v4()}>
									{ lender.business_name &&
										<SimpleRow
											title="Business Name"
											content={lender.business_name}
										/>
									}

									{ lender.fei_number &&
										<SimpleRow
											title="FEI Number"
											content={lender.fei_number}
										/>
									}

									{ _.get(lender, 'address.display') &&
										<SimpleRow
											title="Address"
											content={lender.address.display}
										/>
									}
								</div>
							))}
						</div>
					}

				</div>
			)) }
		</section>
	);
};

UccFilingsTu.propTypes = {
	uccFilingsTu: React.PropTypes.array.isRequired
};

export default UccFilingsTu;
