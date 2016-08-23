import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';

const Assets = (props) => {
	let { assets } = props;

	return (
		<div className="multi-container">
			<section id="assets" className="widget multi-widget premium">
				<h2 className="title">Properties</h2>
				{ assets.map((asset, index) => (
					<div className="license widget" key={index}>
						<h3 className="title">{asset.entities[0].address.display}</h3>
						{ (_.has(asset, 'entities[1].original_names[0].name')  && asset.entities[1].original_names[0].name) ? 
							<SimpleRow
								key={`name-${uuid.v4()}`}
								content={asset.entities[1].original_names[0].name}
								title="Owner Name"
							/> : null
						}
						{ (_.has(asset, 'record_type_desc') && asset.record_type_desc) ?
							<SimpleRow
								key={`record-type-${uuid.v4()}`}
								content={asset.record_type_desc}
								title="Record Type"
							/> : null
						}
						{ (_.has(asset, 'deed.document_type_desc') && asset.deed.document_type_desc) ?
							<SimpleRow
								key={`deed-type-${uuid.v4()}`}
								content={asset.deed.document_type_desc}
								title="Deed Type"
							/> : null
						}
						{ (_.has(asset, 'assessment.assessee_relationship') && asset.assessment.assessee_relationship) ?
							<SimpleRow
								key={`relationship-${uuid.v4()}`}
								content={asset.assessment.assessee_relationship}
								title="Assessee Relationship Status"
							/> : null
						}
						{ (_.has(asset, 'assessment.assessed_total_value') && asset.assessment.assessed_total_value) ?
							<SimpleRow
								key={`value-${uuid.v4()}`}
								content={'$' + asset.assessment.assessed_total_value}
								title="Assessed Value"
							/> : null
						}
						{ (_.has(asset, 'assessment.land_square_footage') && asset.assessment.land_square_footage) ?
							<SimpleRow
								key={`square-footage-${uuid.v4()}`}
								content={asset.assessment.land_square_footage}
								title="Square Footage"
							/> : null
						}
						{ (_.has(asset, 'assessment.source_property_record.living_square_feet') && asset.assessment.source_property_record.living_square_feet) ?
							<SimpleRow
								key={`living-square-footage-${uuid.v4()}`}
								content={asset.assessment.source_property_record.living_square_feet}
								title="Living Square Footage"
							/> : null
						}
						{ (_.has(asset, 'assessment.exterior_walls') && asset.assessment.exterior_walls) ?
							<SimpleRow
								key={`assessment.exterior_walls-${uuid.v4()}`}
								content={asset.assessment.exterior_walls}
								title="Exterior Walls"
							/> : null
						}
						{ (_.has(asset, 'assessment.no_of_baths') && asset.assessment.no_of_baths) ?
							<SimpleRow
								key={`assessment-no_of_baths-${uuid.v4()}`}
								content={asset.assessment.no_of_baths}
								title="Baths"
							/> : null
						}
						{ (_.has(asset, 'assessment.no_of_partial_baths') && asset.assessment.no_of_partial_baths) ?
							<SimpleRow
								key={`assessment-no_of_partial_baths-${uuid.v4()}`}
								content={asset.assessment.no_of_partial_baths}
								title="Partial Baths"
							/> : null
						}
						{ (_.has(asset, 'assessment.no_of_bedrooms') && asset.assessment.no_of_bedrooms) ?
							<SimpleRow
								key={`no_of_bedrooms-${uuid.v4()}`}
								content={asset.assessment.no_of_bedrooms}
								title="Bedrooms"
							/> : null
						}
						{ (_.has(asset, 'assessment.no_of_stories') && asset.assessment.no_of_stories) ?
							<SimpleRow
								key={`record-${uuid.v4()}`}
								content={asset.assessment.no_of_stories}
								title="Stories"
							/> : null
						}
						{ (_.has(asset, 'assessment.heating')  && asset.assessment.heating) ?
							<SimpleRow
								key={`heating-${uuid.v4()}`}
								content={asset.assessment.heating}
								title="Heating"
							/> : null
						}
						{ (_.has(asset, 'assessment.air_conditioning')  && asset.assessment.air_conditioning) ?
							<SimpleRow
								key={`air_conditioning-${uuid.v4()}`}
								content={asset.assessment.air_conditioning}
								title="AC"
							/> : null
						}
						{ (_.has(asset, 'assessment.garage_type') && asset.assessment.garage_type) ?
							<SimpleRow
								key={`garage_type-${uuid.v4()}`}
								content={asset.assessment.garage_type}
								title="Garage Type"
							/> : null
						}
						{ (_.has(asset, 'assessment.pool')  && asset.assessment.pool) ?
							<SimpleRow
								key={`pool-${uuid.v4()}`}
								content={asset.assessment.pool}
								title="Pool/Hot Tub/Sauna"
							/> : null
						}
						{ (_.has(asset, 'assessment.land_use') && asset.assessment.land_use) ?
							<SimpleRow
								key={`land_use-${uuid.v4()}`}
								content={asset.assessment.land_use}
								title="Use"
							/> : null
						}
						{ (_.has(asset, 'assessment.year_built') && asset.assessment.year_built) ?
							<SimpleRow
								key={`year_built-${uuid.v4()}`}
								content={asset.assessment.year_built}
								title="Year Built"
							/> : null
						}
						{ (_.has(asset, 'parcel_id') && asset.parcel_id) ?
							<SimpleRow
								key={`parcel_id-${uuid.v4()}`}
								content={asset.assessment.parcel_id}
								title="Parcel ID"
							/> : null
						}
						{ (_.has(asset, 'assessment.county') && asset.assessment.county) ?
							<SimpleRow
								key={`county-${uuid.v4()}`}
								content={asset.assessment.county}
								title="County Code"
							/> : null
						}
						{ (_.has(asset, 'assessment.fips_code') && asset.assessment.fips_code) ?
							<SimpleRow
								key={`fips_code-${uuid.v4()}`}
								content={asset.assessment.fips_code}
								title="Fips County Code"
							/> : null
						}
						{ (_.has(asset, 'assessment.sale_date.date.month') && asset.assessment.sale_date.date.month) ?
							<SimpleRow
								key={`sale_date-${uuid.v4()}`}
								content={constants.months[asset.assessment.sale_date.date.month] + ', ' + asset.assessment.sale_date.date.day + ' ' + asset.assessment.sale_date.date.year}
								title="Sale Date"
							/> : null
						}
						{ (_.has(asset, 'assessment.sales_price') && asset.assessment.sales_price) ?
							<SimpleRow
								key={`price-${uuid.v4()}`}
								content={'$' + asset.assessment.sales_price}
								title="Sale Price"
							/> : null
						}
						{ (_.has(asset, 'assessment.recording_date.date.month') && asset.assessment.recording_date.date.month) ?
							<SimpleRow
								key={`record-${uuid.v4()}`}
								content={constants.months[asset.assessment.recording_date.date.month] + ', ' + asset.assessment.recording_date.date.day + ' ' + asset.assessment.recording_date.date.year}
								title="Recording Date"
							/> : null
						}
						{ (_.has(asset, 'assessment.assessed_total_value') && asset.assessment.assessed_total_value) ?
							<SimpleRow
								key={`assessed_total_value-${uuid.v4()}`}
								content={'$' + asset.assessment.assessed_total_value}
								title="Assessed Total Value"
							/> : null
						}
						{ (_.has(asset, 'assessment.assessed_improvement_value') && asset.assessment.assessed_improvement_value) ?
							<SimpleRow
								key={`assessed_improvement_value-${uuid.v4()}`}
								content={'$' + asset.assessment.assessed_improvement_value}
								title="Assessed Improvement Value"
							/> : null
						}
						{ (_.has(asset, 'assessment.market_land_value') &&  asset.assessment.market_land_value !== '') ?
							<SimpleRow
								key={`market_land_value-${uuid.v4()}`}
								content={'$' + asset.assessment.market_land_value}
								title="Market Land Value"
							/> : null
						}
						{ (_.has(asset, 'assessment.market_total_value') &&  asset.assessment.market_total_value !== '') ?
							<SimpleRow
								key={`market_total_value-${uuid.v4()}`}
								content={'$' + asset.assessment.market_total_value}
								title="Fair Market Value"
							/> : null
						}
						{ (_.has(asset, 'assessment.market_improvement_value') &&  asset.assessment.market_improvement_value !== '') ?
							<SimpleRow
								key={`market_improvement_value-${uuid.v4()}`}
								content={'$' + asset.assessment.market_improvement_value}
								title="Market Improvement Value"
							/> : null
						}
						{ (_.has(asset, 'assessment.tax_year') &&  asset.assessment.tax_year !== '') ?
							<SimpleRow
								key={`tax_year-${uuid.v4()}`}
								content={asset.assessment.tax_year}
								title="Tax Year"
							/> : null
						}
						{ (_.has(asset, 'assessment.tax_amount') &&  asset.assessment.tax_amount !== '') ?
							<SimpleRow
								key={`tax_amount-${uuid.v4()}`}
								content={'$' + asset.assessment.tax_amount}
								title="Tax Amount"
							/> : null
						}
						{ (_.has(asset, 'deed.title_company') && asset.deed.title_company) ?
							<SimpleRow
								key={`title_company-${uuid.v4()}`}
								content={asset.deed.title_company}
								title="Deed Title Company"
							/> : null
						}
						{ (_.has(asset, 'deed.document_number') && asset.deed.document_number) ?
							<SimpleRow
								key={`document_number-${uuid.v4()}`}
								content={asset.deed.document_number}
								title="Document Number"
							/> : null
						}

						{ (_.has(asset, 'deed.contract_date.date.month') && asset.deed.contract_date.date.month) ?
							<SimpleRow
								key={`record-${uuid.v4()}`}
								content={constants.months[asset.deed.contract_date.date.month] + ', ' + asset.deed.contract_date.date.day + ' ' + asset.deed.contract_date.date.year}
								title="Deed Contract Date"
							/> : null
						}
						{ (_.has(asset, 'deed.recording_date.date.month') && asset.deed.recording_date.date.month) ?
							<SimpleRow
								key={`record-${uuid.v4()}`}
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
