import React from 'react';
import _ from 'lodash';
import Sticky from 'react-stickynode';
import constants from 'constants/pubRecConstants';
import SimpleRow from 'components/SimpleRow';
import uuid from 'uuid';

import * as libs from 'utils/libs';

const Assets = (props) => {
	let {
		assets,
		isPremium,
		name,
		showPremiumUpsell,
		recordID
	} = props;

	if (!isPremium) {
		return (
			<section id="assets" className="widget">
				<Sticky>
					<h2 className="title">Asset Information</h2>
				</Sticky>

				<div className="document">
					<div className="label">
						<h4>Additional Info</h4>
					</div>

					<p>Asset information can only be revealed after you give authorization. Click the button below to access all the available information on {name}’s assets.</p>

					<p>
						<button className="btn btn-upgrade" onClick={() => showPremiumUpsell(recordID)}>View Premium Data</button>
					</p>
				</div>
			</section>
		);
	}

	if (isPremium && assets.length === 0) {
		return null;
	}

	return (
		<div className="multi-container">
			<section id="assets" className="widget premium">
				<Sticky>
					<h2 className="title">Properties</h2>
				</Sticky>
				{ assets.map((asset, index) => (
					<div className="document asset-individual" key={index}>
						{ _.get(asset, 'entities[0].address.display') ?
							<div className="label label-full">
								<h3 className="document-title">{asset.entities[0].address.display}</h3>
							</div>
						: null }

						{ _.get(asset, 'deed.property_use_desc') ?
							<SimpleRow
								content={asset.deed.property_use_desc}
								title="Property Description"
							/> : null
						}

						{ !_.get(asset, 'deed.property_use_desc') && _.get(asset, 'assessment.land_use') ?
							<SimpleRow
								content={asset.assessment.land_use}
								title="Property Description"
							/> : null
						}

						{ _.get(asset, 'assessment.legal_info.subdivision') ?
							<SimpleRow
								content={asset.assessment.legal_info.subdivision}
								title="Subdivision Name"
							/> : null
						}

						{ _.get(asset, 'entities[1].original_names[0].name') ?
							<SimpleRow
								content={asset.entities[1].original_names[0].name}
								title="Owner Name"
							/> : null
						}

						{ _.get(asset, 'deed.document_type_desc') ?
							<SimpleRow
								content={asset.deed.document_type_desc}
								title="Deed Type"
							/> : null
						}

						{ _.get(asset, 'assessment.assessee_relationship') ?
							<SimpleRow
								content={asset.assessment.assessee_relationship}
								title="Assessee Relationship Status"
							/> : null
						}
						{ _.get(asset, 'assessment.assessed_total_value') ?
							<SimpleRow
								content={libs._getFormattedCurrency(asset.assessment.assessed_total_value)}
								title="Assessed Value"
							/> : null
						}
						{ _.get(asset, 'assessment.land_square_footage') ?
							<SimpleRow
								content={asset.assessment.land_square_footage}
								title="Lot Size"
							/> : null
						}
						{ _.get(asset, 'assessment.source_property_record.living_square_feet') ?
							<SimpleRow
								content={asset.assessment.source_property_record.living_square_feet}
								title="Square Footage"
							/> : null
						}
						{ _.get(asset, 'assessment.exterior_walls') ?
							<SimpleRow
								content={asset.assessment.exterior_walls}
								title="Exterior Walls"
							/> : null
						}
						{ _.get(asset, 'assessment.no_of_baths') ?
							<SimpleRow
								content={asset.assessment.no_of_baths}
								title="Baths"
							/> : null
						}
						{ _.get(asset, 'assessment.no_of_partial_baths') ?
							<SimpleRow
								content={asset.assessment.no_of_partial_baths}
								title="Partial Baths"
							/> : null
						}
						{ _.get(asset, 'assessment.no_of_bedrooms') ?
							<SimpleRow
								content={asset.assessment.no_of_bedrooms}
								title="Bedrooms"
							/> : null
						}
						{ _.get(asset, 'assessment.no_of_stories') ?
							<SimpleRow
								content={asset.assessment.no_of_stories}
								title="Stories"
							/> : null
						}
						{ _.get(asset, 'assessment.heating') ?
							<SimpleRow
								content={asset.assessment.heating}
								title="Heating"
							/> : null
						}
						{ _.get(asset, 'assessment.air_conditioning') ?
							<SimpleRow
								content={asset.assessment.air_conditioning}
								title="AC"
							/> : null
						}
						{ _.get(asset, 'assessment.garage_type') ?
							<SimpleRow
								content={asset.assessment.garage_type}
								title="Garage Type"
							/> : null
						}
						{ _.get(asset, 'assessment.pool') ?
							<SimpleRow
								content={asset.assessment.pool}
								title="Pool/Hot Tub/Sauna"
							/> : null
						}

						{ _.get(asset, 'assessment.year_built') ?
							<SimpleRow
								content={asset.assessment.year_built}
								title="Year Built"
							/> : null
						}
						{ _.get(asset, 'assessment.parcel_id') ?
							<SimpleRow
								content={asset.assessment.parcel_id}
								title="Parcel ID"
							/> : null
						}
						{ asset.deed ?
							<div className="subgroup subgroup-singular">
								<h3>Transaction Information</h3>

								{ _.get(asset, 'deed.contract_date.date.month') ?
									<SimpleRow
										content={constants.months[asset.deed.contract_date.date.month] + ' ' + asset.deed.contract_date.date.day + ' ' + asset.deed.contract_date.date.year}
										title="Contract Date"
									/> : null
								}

								{ _.get(asset, 'deed.recording_date.date.month') ?
									<SimpleRow
										content={constants.months[asset.deed.recording_date.date.month] + ' ' + asset.deed.recording_date.date.day + ' ' + asset.deed.recording_date.date.year}
										title="Deed Transfer Recording Date"
									/> : null
								}

								{ _.get(asset, 'deed.sales_price') ?
									<SimpleRow
										content={libs._getFormattedCurrency(asset.deed.sales_price)}
										title="Sale Price"
									/> : null
								}

								{ !_.get(asset, 'deed.sales_price') && _.get(asset,'assessment.sales_price') ?
									<SimpleRow
										content={libs._getFormattedCurrency(asset.assessment.sales_price)}
										title="Sale Price"
									/> : null
								}

								{ _.get(asset, 'deed.sales_price') && _.get(asset, 'deed.first_td_loan_amount') ?
									<SimpleRow
										content={libs._getFormattedCurrency(asset.deed.sales_price - asset.deed.first_td_loan_amount)}
										title="Estimated Down Payment"
									/> : null
								}

								{ _.get(asset, 'deed.first_td_loan_type') && _.get(asset, 'deed.first_td_loan_amount') ?
									<SimpleRow
										content={asset.deed.first_td_loan_type}
										title="Mortgage Type"
									/> : null
								}

								{ _.get(asset, 'deed.first_td_loan_amount') ?
									<SimpleRow
										content={libs._getFormattedCurrency(asset.deed.first_td_loan_amount)}
										title="Mortage Amount"
									/> : null
								}

								{ _.get(asset, 'deed.deed_source_property_record.mortgage_term') ?
									<SimpleRow
										content={asset.deed.deed_source_property_record.mortgage_term + ' ' + asset.deed.deed_source_property_record.mortgage_term_code_desc}
										title="Mortgage Term"
									/> : null
								}

								{ _.get(asset, 'deed.first_td_due_date.date.month') ?
									<SimpleRow
										content={constants.months[asset.deed.first_td_due_date.date.month] + ' ' + asset.deed.first_td_due_date.date.day + ' ' + asset.deed.first_td_due_date.date.year}
										title="Date Loan Will Be Paid Off"
									/> : null
								}

								{ _.get(asset, 'deed.lender_info.name') ?
									<SimpleRow
										content={asset.deed.lender_info.name}
										title="Lender Name"
									/> : null
								}

								{ _.get(asset, 'deed.county_transfer_tax') ?
									<SimpleRow
										content={`$${asset.deed.county_transfer_tax}`}
										title="County Transfer Tax Amount"
									/> : null
								}

								{ _.find(asset.entities, ['entity_type', 'Seller']) ?
									<div className="subgroup" key={uuid.v4()}>
										<h3>Sellers</h3>
										{ _.find(asset.entities, ['entity_type', 'Seller']).original_names.map((name) => (
											<div className="seller" key={uuid.v4()}>
												{ name.name ?
													<SimpleRow
														content={name.name}
														title="Seller"
													/> : null
												}
											</div>
										))}
									</div> : null
								}

								{ _.find(asset.entities, ['entity_type', 'Buyer']) ?
									<div className="subgroup" key={uuid.v4()}>
										<h3>Buyers</h3>
										{ _.find(asset.entities, ['entity_type', 'Buyer']).original_names.map((name) => (
											<div className="buyer" key={uuid.v4()}>
												{ name.name ?
													<SimpleRow
														content={name.name}
														title="Buyer"
													/> : null
												}
											</div>
										))}
									</div> : null
								}
							</div>
						: null }

						{ _.get(asset, 'assessment.recording_date.date.month') ?
							<SimpleRow
								content={constants.months[asset.assessment.recording_date.date.month] + ', ' + asset.assessment.recording_date.date.day + ' ' + asset.assessment.recording_date.date.year}
								title="Assessmenet Recording Date"
							/> : null
						}
						{ _.get(asset, 'assessment.assessed_total_value') ?
							<SimpleRow
								content={libs._getFormattedCurrency(asset.assessment.assessed_total_value)}
								title="Assessed Total Value"
							/> : null
						}
						{ _.get(asset, 'assessment.assessed_improvement_value') ?
							<SimpleRow
								content={libs._getFormattedCurrency(asset.assessment.assessed_improvement_value)}
								title="Assessed Improvement Value"
							/> : null
						}
						{ _.get(asset, 'assessment.market_land_value') ?
							<SimpleRow
								content={libs._getFormattedCurrency(asset.assessment.market_land_value)}
								title="Market Land Value"
							/> : null
						}
						{ _.get(asset, 'assessment.market_total_value') ?
							<SimpleRow
								content={libs._getFormattedCurrency(asset.assessment.market_total_value)}
								title="Fair Market Value"
							/> : null
						}
						{ _.get(asset, 'assessment.market_improvement_value') ?
							<SimpleRow
								content={libs._getFormattedCurrency(asset.assessment.market_improvement_value)}
								title="Market Improvement Value"
							/> : null
						}
						{ _.get(asset, 'assessment.assessed_value_year') ?
							<SimpleRow
								content={asset.assessment.assessed_value_year}
								title="Assessment Year"
							/> : null
						}
						{ _.get(asset, 'assessment.tax_year')?
							<SimpleRow
								content={asset.assessment.tax_year}
								title="Tax Year"
							/> : null
						}
						{ _.get(asset, 'assessment.tax_amount') ?
							<SimpleRow
								content={libs._getFormattedCurrency(asset.assessment.tax_amount)}
								title="Tax Amount"
							/> : null
						}
						{ _.get(asset, 'deed.title_company') ?
							<SimpleRow
								content={asset.deed.title_company}
								title="Deed Title Company"
							/> : null
						}
						{ _.get(asset, 'deed.document_number') ?
							<SimpleRow
								content={asset.deed.document_number}
								title="Document Number"
							/> : null
						}

						{ _.get(asset, 'deed.recording_date.date.month') ?
							<SimpleRow
								content={constants.months[asset.deed.recording_date.date.month] + ', ' + asset.deed.recording_date.date.day + ' ' + asset.deed.recording_date.date.year}
								title="Deed Recording Date"
							/> : null
						}
					</div>
				)) }
			</section>
		</div>
	);
};


Assets.propTypes = {
	assets: React.PropTypes.array,
	isPremium: React.PropTypes.bool,
	name: React.PropTypes.string,
	showPremiumUpsell: React.PropTypes.func,
	recordID: React.PropTypes.string
};

export default Assets;
