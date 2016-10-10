import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import numeral from 'numeral';
import Sticky from 'react-stickynode';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';

const Assets = (props) => {
	let { assets } = props;
	return (
		<div className="multi-container">
			<section id="assets" className="widget premium">
				<Sticky>
					<h2 className="title">Properties</h2>
				</Sticky>
				{ assets.map((asset, index) => (
					<div className="asset asset-individual" key={index}>
						{ _.get(asset, 'entities[0].address.display') ?
							<div className="label label-full">
								<h3 className="record-title">{asset.entities[0].address.display}</h3>
							</div>
						: null }

						{ _.get(asset, 'deed.property_use_description') ?
							<SimpleRow
								content={deed.property_use_description}
								title="Property Description"
							/> : null
						}

						{ _.get(asset, 'entities[1].original_names[0].name') ?
							<SimpleRow
								content={asset.entities[1].original_names[0].name}
								title="Owner Name"
							/> : null
						}

						{ (_.has(asset, 'deed.document_type_desc') && asset.deed.document_type_desc) ?
							<SimpleRow
								content={asset.deed.document_type_desc}
								title="Deed Type"
							/> : null
						}

						{ (_.has(asset, 'assessment.assessee_relationship') && asset.assessment.assessee_relationship) ?
							<SimpleRow
								content={asset.assessment.assessee_relationship}
								title="Assessee Relationship Status"
							/> : null
						}
						{ (_.has(asset, 'assessment.assessed_total_value') && asset.assessment.assessed_total_value) ?
							<SimpleRow
								content={numeral(asset.assessment.assessed_total_value).format('$ 0,0[.]00')}
								title="Assessed Value"
							/> : null
						}
						{ (_.has(asset, 'assessment.land_square_footage') && asset.assessment.land_square_footage) ?
							<SimpleRow
								content={asset.assessment.land_square_footage}
								title="Lot Size"
							/> : null
						}
						{ (_.has(asset, 'assessment.source_property_record.living_square_feet') && asset.assessment.source_property_record.living_square_feet) ?
							<SimpleRow
								content={asset.assessment.source_property_record.living_square_feet}
								title="Square Footage"
							/> : null
						}
						{ (_.has(asset, 'assessment.exterior_walls') && asset.assessment.exterior_walls) ?
							<SimpleRow
								content={asset.assessment.exterior_walls}
								title="Exterior Walls"
							/> : null
						}
						{ (_.has(asset, 'assessment.no_of_baths') && asset.assessment.no_of_baths) ?
							<SimpleRow
								content={asset.assessment.no_of_baths}
								title="Baths"
							/> : null
						}
						{ (_.has(asset, 'assessment.no_of_partial_baths') && asset.assessment.no_of_partial_baths) ?
							<SimpleRow
								content={asset.assessment.no_of_partial_baths}
								title="Partial Baths"
							/> : null
						}
						{ (_.has(asset, 'assessment.no_of_bedrooms') && asset.assessment.no_of_bedrooms) ?
							<SimpleRow
								content={asset.assessment.no_of_bedrooms}
								title="Bedrooms"
							/> : null
						}
						{ (_.has(asset, 'assessment.no_of_stories') && asset.assessment.no_of_stories) ?
							<SimpleRow
								content={asset.assessment.no_of_stories}
								title="Stories"
							/> : null
						}
						{ (_.has(asset, 'assessment.heating')  && asset.assessment.heating) ?
							<SimpleRow
								content={asset.assessment.heating}
								title="Heating"
							/> : null
						}
						{ (_.has(asset, 'assessment.air_conditioning')  && asset.assessment.air_conditioning) ?
							<SimpleRow
								content={asset.assessment.air_conditioning}
								title="AC"
							/> : null
						}
						{ (_.has(asset, 'assessment.garage_type') && asset.assessment.garage_type) ?
							<SimpleRow
								content={asset.assessment.garage_type}
								title="Garage Type"
							/> : null
						}
						{ (_.has(asset, 'assessment.pool')  && asset.assessment.pool) ?
							<SimpleRow
								content={asset.assessment.pool}
								title="Pool/Hot Tub/Sauna"
							/> : null
						}

						{ (_.has(asset, 'assessment.year_built') && asset.assessment.year_built) ?
							<SimpleRow
								content={asset.assessment.year_built}
								title="Year Built"
							/> : null
						}
						{ asset.parcel_id ?
							<SimpleRow
								content={asset.assessment.parcel_id}
								title="Parcel ID"
							/> : null
						}

						<div className="subgroup">
							<h3>Transaction Information</h3>
								<div>
									{ _.get(asset, 'assessment.sale_date.date.month') ?
										<SimpleRow
											content={constants.months[asset.assessment.sale_date.date.month] + ' ' + asset.assessment.sale_date.date.day + ' ' + asset.assessment.sale_date.date.year}
											title="Purchase/Transfer Date"
										/> : null
									}

									{ !_.get(asset, 'assessment.sale_date.date.month') && _.get(asset, 'deed.contract_date.date.month') ?
										<SimpleRow
											content={constants.months[asset.deed.contract_date.date.month] + ' ' + asset.deed.contract_date.date.day + ' ' + asset.deed.contract_date.date.year}
											title="Purchase/Transfer Date"
										/> : null
									}
									
									{ _.get(asset, 'deed.sales_price') ?
										<SimpleRow
											content={numeral(asset.deed.sales_price).format('$ 0,0[.]00')}
											title="Sale Price"
										/> : null
									}

									{ !_.get(asset, 'deed.sales_price') && _.get(asset,'assessment.sales_price') ?
										<SimpleRow
											content={numeral(asset.assessment.sales_price).format('$ 0,0[.]00')}
											title="Sale Price"
										/> : null
									}

									{ _.get(asset, 'deed.sales_price') && _.get(asset, 'deed.first_td_loan_amount') ?
										<SimpleRow
											content={'$' + (Number.parseInt(asset.deed.sales_price) - Number.parseInt(asset.deed.first_td_loan_amount))}
											title="Estimated Down Payment"
										/> : null
									}

									{ _.get(asset, 'deed.first_td_loan_type') ?
										<SimpleRow
											content={asset.deed.first_td_loan_type}
											title="Mortgage Type"
										/> : null
									}

									{ _.get(asset, 'deed.first_td_loan_amount') ?
										<SimpleRow
											content={numeral(asset.deed.first_td_loan_amount).format('$ 0,0[.]00')}
											title="Mortage Amount"
										/> : null
									}

									{ _.get(asset, 'deed.deed_source_property_record.mortgage_term') ?
										<SimpleRow
											content={asset.deed.deed_source_property_record.mortgage_term + ' ' + asset.deed.deed_source_property_record.mortgage_term_code_desc}
											title="Mortgage Term"
										/> : null
									}

									{ _.get(asset, 'deed.lender_info.name') ?
										<SimpleRow
											content={asset.deed.lender_info.name}
											title="Lender Name"
										/> : null
									}
								</div>
						</div> 

						{ (_.has(asset, 'assessment.recording_date.date.month') && asset.assessment.recording_date.date.month) ?
							<SimpleRow
								content={constants.months[asset.assessment.recording_date.date.month] + ', ' + asset.assessment.recording_date.date.day + ' ' + asset.assessment.recording_date.date.year}
								title="Recording Date"
							/> : null
						}
						{ (_.has(asset, 'assessment.assessed_total_value') && asset.assessment.assessed_total_value) ?
							<SimpleRow
								content={numeral(asset.assessment.assessed_total_value).format('$ 0,0[.]00')}
								title="Assessed Total Value"
							/> : null
						}
						{ (_.has(asset, 'assessment.assessed_improvement_value') && asset.assessment.assessed_improvement_value) ?
							<SimpleRow
								content={numeral(asset.assessment.assessed_improvement_value).format('$ 0,0[.]00')}
								title="Assessed Improvement Value"
							/> : null
						}
						{ (_.has(asset, 'assessment.market_land_value') &&  asset.assessment.market_land_value !== '') ?
							<SimpleRow
								content={numeral(asset.assessment.market_land_value).format('$ 0,0[.]00')}
								title="Market Land Value"
							/> : null
						}
						{ (_.has(asset, 'assessment.market_total_value') &&  asset.assessment.market_total_value !== '') ?
							<SimpleRow
								content={numeral(asset.assessment.market_total_value).format('$ 0,0[.]00')}
								title="Fair Market Value"
							/> : null
						}
						{ (_.has(asset, 'assessment.market_improvement_value') &&  asset.assessment.market_improvement_value !== '') ?
							<SimpleRow
								content={numeral(asset.assessment.market_improvement_value).format('$ 0,0[.]00')}
								title="Market Improvement Value"
							/> : null
						}
						{ _.get(asset, 'assessment.assessed_value_year') ?
							<SimpleRow
								content={asset.assessment.assessed_value_year}
								title="Assessment Year"
							/> : null
						}
						{ (_.has(asset, 'assessment.tax_year') &&  asset.assessment.tax_year !== '') ?
							<SimpleRow
								content={asset.assessment.tax_year}
								title="Tax Year"
							/> : null
						}
						{ (_.has(asset, 'assessment.tax_amount') &&  asset.assessment.tax_amount !== '') ?
							<SimpleRow
								content={numeral(asset.assessment.tax_amount).format('$ 0,0[.]00')}
								title="Tax Amount"
							/> : null
						}
						{ (_.has(asset, 'deed.title_company') && asset.deed.title_company) ?
							<SimpleRow
								content={asset.deed.title_company}
								title="Deed Title Company"
							/> : null
						}
						{ (_.has(asset, 'deed.document_number') && asset.deed.document_number) ?
							<SimpleRow
								content={asset.deed.document_number}
								title="Document Number"
							/> : null
						}

						{ (_.has(asset, 'deed.recording_date.date.month') && asset.deed.recording_date.date.month) ?
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
	assets: React.PropTypes.array.isRequired
};

export default Assets;
