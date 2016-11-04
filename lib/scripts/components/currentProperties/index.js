import React from 'react';
import _ from 'lodash';
import Sticky from 'react-stickynode';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';
import uuid from 'uuid';

import * as libs from '../../utils/libs';

const CurrentProperties = (props) => {
	let { currentProperties } = props;
	console.log(currentProperties);
	return (
		<div className="multi-container">
			<section id="current-properties" className="widget premium">
				<Sticky>
					<h2 className="title">Properties</h2>
				</Sticky>
				{ currentProperties.map((property, index) => (
					<div className="document property-individual" key={index}>
						{ _.get(property, 'address.display') ?
							<div className="label label-full">
								<h3 className="document-title">{property.address.display}</h3>
							</div>
						: null }

						{ _.get(property, 'ownerships[0].property_indicator') ?
							<SimpleRow
								content={property.ownerships[0].property_indicator}
								title="Property Description"
							/> : null
						}

						{ _.get(property, 'subdivision_name') ?
							<SimpleRow
								content={property.subdivision_name}
								title="Subdivision Name"
							/> : null
						}

						{ _.get(property,'property_taxes.municipality_name') ?
								<SimpleRow
									content={property.property_taxes.municipality_name}
									title="Municipality Name"
								/> : null
							}

						{ _.get(property, 'owners[0].names[0].display') ?
							<SimpleRow
								key={uuid.v4()}
								title="Owner Name"
								content={property.owners[0].names[0].display}
							/> :null 
						}

						<div className="subgroup subgroup-singular">
							<h3>Property Information</h3>

							{ _.get(property,'apn') ?
								<SimpleRow
									content={property.apn}
									title="Parcel ID"
								/> : null
							}

							{ _.get(property,'bedrooms') ?
								<SimpleRow
									content={property.bedrooms}
									title="Number of Bedrooms"
								/> : null
							}

							{ _.get(property,'property_taxes.assessments[0].full_baths') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].full_baths}
									title="Full Bathrooms"
								/> : null
							}

							{ _.get(property,'property_taxes.assessments[0].half_baths') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].half_baths}
									title="Half Bathrooms"
								/> : null
							}

							{ _.get(property,'living_square_feet') ?
								<SimpleRow
									content={property.living_square_feet}
									title="Square Footage"
								/> : null
							}
							{ _.get(property,'property_taxes.assessments[0].stories') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].stories}
									title="Number of Stories"
								/> : null
							}

							{ _.get(property,'assessed_value') ?
								<SimpleRow
									content={libs._getFormattedCurrency(property.assessed_value)}
									title="Assessed Value"
								/> : null
							}

							{ _.get(property,'land_value') ?
								<SimpleRow
									content={libs._getFormattedCurrency(property.land_value)}
									title="Land Value"
								/> : null
							}

							{ _.get(property,'improvement_value') ?
								<SimpleRow
									content={libs._getFormattedCurrency(property.improvement_value)}
									title="Improvement Value"
								/> : null
							}

							{ _.get(property,'assessed_year') ?
								<SimpleRow
									content={property.assessed_year}
									title="Assessed Year"
								/> : null
							}

							{ _.get(property,'land_square_feet') ?
								<SimpleRow
									content={property.land_square_feet}
									title="Lot Size"
								/> : null
							}

							{ _.get(property,'property_taxes.assessments[0].year_built') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].year_built}
									title="Year Built"
								/> : null
							}

							{ _.get(property,'property_taxes.assessments[0].air_conditioning') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].air_conditioning}
									title="Air Conditioning"
								/> : null
							}

							{ _.get(property,'property_taxes.assessments[0].construction_type') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].construction_type}
									title="Construction Type"
								/> : null
							}

							{ _.get(property,'property_taxes.assessments[0].basement_square_feet') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].basement_square_feet}
									title="Basement Square Footage"
								/> : null
							}

							{ _.get(property,'property_taxes.assessments[0].air_conditioning') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].air_conditioning}
									title="Air Conditioning"
								/> : null
							}

							{ _.get(property,'property_taxes.assessments[0].fireplace_number') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].fireplace_number}
									title="Number of Fireplaces"
								/> : null
							}
							{ _.get(property,'property_taxes.assessments[0].garage') && property.property_taxes.assessments[0].garage != 'Type Unknown' ?
								<SimpleRow
									content={property.property_taxes.assessments[0].garage}
									title="Garage Type"
								/> : null
							}
							{ _.get(property,'property_taxes.assessments[0].garage_parking_square_feet') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].garage_parking_square_feet}
									title="Garage Square Footage"
								/> : null
							}
							{ _.get(property,'property_taxes.assessments[0].heating') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].heating}
									title="Heating"
								/> : null
							}
							{ _.get(property,'property_taxes.assessments[0].parking_spaces') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].parking_spaces}
									title="Parking Spaces"
								/> : null
							}
							{ _.get(property,'property_taxes.assessments[0].air_conditioning') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].air_conditioning}
									title="Air Conditioning"
								/> : null
							}
							{ _.get(property,'property_taxes.assessments[0].pool_flag') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].pool_flag == 'Y' ? 'Yes' : 'No'}
									title="Pool"
								/> : null
							}
							{ _.get(property,'property_taxes.assessments[0].pool') && property.property_taxes.assessments[0].pool != 'Type Unknown' ?
								<SimpleRow
									content={property.property_taxes.assessments[0].pool}
									title="Pool Type"
								/> : null
							}
							{ _.get(property,'property_taxes.assessments[0].air_conditioning') ?
								<SimpleRow
									content={property.property_taxes.assessments[0].air_conditioning}
									title="Air Conditioning"
								/> : null
							}

							{ _.get(property,'property_taxes.assessments[0].view') && property.property_taxes.assessments[0].view != 'Type Unknown' ?
								<SimpleRow
									content={property.property_taxes.assessments[0].view}
									title="View"
								/> : null
							}

						</div> 
						

						{ property.ownerships ?
							<div className="subgroup">
								<h3>Ownership History</h3>
								{ property.ownerships.map((ownership, i) => (
									<div className="owner-history" key={uuid.v4()}>
										{ _.get(ownership, 'date_first_seen_as_owner.date.month') ?
											<h4>Purchase Date: {constants.months[ownership.date_first_seen_as_owner.date.month] + ' ' + ownership.date_first_seen_as_owner.date.day + ' ' + ownership.date_first_seen_as_owner.date.year}</h4> : null
										}

										{ _.get(ownership, 'resale_new_construction') ?
											<SimpleRow
												content={ownership.resale_new_construction}
												title="Sale Type"
											/> : null
										}

										{ _.get(ownership, 'sale_amount') ?
											<SimpleRow
												content={libs._getFormattedCurrency(ownership.sale_amount)}
												title="Sale Price"
											/> : null
										}

										{ _.get(ownership, 'resale_new_construction') ?
											<SimpleRow
												content={ownership.resale_new_construction}
												title="Sale Type"
											/> : null
										}

										{ _.get(ownership, 'deed_sec_cat') ?
											<SimpleRow
												content={ownership.deed_sec_cat}
												title="Purchase Type"
											/> : null
										}

										{ _.get(ownership, 'absentee_indicator') ?
											<SimpleRow
												content={ownership.absentee_indicator}
												title="Owner Occupied"
											/> : null
										}

										{ _.get(ownership, 'owner_ownership_ights') ?
											<SimpleRow
												content={ownership.owner_ownership_ights}
												title="Ownership Rights"
											/> : null
										}

										{ _.get(ownership, 'owner_relationship_type') ?
											<SimpleRow
												content={ownership.owner_relationship_type}
												title="Owner Status"
											/> : null
										}

										{ _.get(ownership, 'title_company_name') ?
											<SimpleRow
												content={ownership.title_company_name}
												title="Title Company"
											/> : null
										}

										{ _.get(ownership, 'trust_name') ?
											<SimpleRow
												content={ownership.trust_name}
												title="Trust Name"
											/> : null
										}

										{ _.get(ownership, 'seller_carry_back') ?
											<SimpleRow
												content={ownership.seller_carry_back}
												title="Seller Financed"
											/> : null
										}



										{ ownership.owners ? 
											<div className="subgroup">
												{ i == 0 ? <h3>Current Owner(s)</h3> : <h3>Previous Owner(s)</h3>} 
												{_.map(ownership.owners, (owner, i) => {
													return(
														<div className="owner" key={uuid.v4()}>
															{ _.get(owner, 'names[0].display') ?
																<SimpleRow
																	content={owner.names[0].display}
																	title="Name"
																/> : null
															}
															{ _.get(owner, 'corporate_affiliations[0].company_names[0].name') ?
																<SimpleRow
																	content={owner.corporate_affiliations[0].company_names[0].name}
																	title=" Company Name"
																/> : null
															}
															{ _.get(owner, 'locations[0].address.display') ?
																<SimpleRow
																	content={owner.locations[0].address.display}
																	title="Address"
																/> : null
															}
			
														</div>
													)
												})}
											</div> : null
										}

										{ ownership.mortgages ? 
											<div className="subgroup">
												<h3>Mortgage Information</h3>
												{_.map(ownership.mortgages, (mortgage, i) => {
													return(
														<div className="mortgage" key={uuid.v4()}>
															{ (_.get(mortgage, 'cash_purchase')) ?
																<SimpleRow
																	content={mortgage.cash_purchase == 'Y' ? 'Yes' : 'No'}
																	title="Cash Purchase"
																/> : null
															}
															{ _.get(mortgage, 'construction_loan') ?
																<SimpleRow
																	content={mortgage.construction_loan}
																	title="Construction Loan"
																/> : null
															}
															{ _.get(mortgage, 'mortgage_amount') ?
																<SimpleRow
																	content={libs._getFormattedCurrency(mortgage.mortgage_amount)}
																	title="Amount"
																/> : null
															}
															{ _.get(mortgage, 'mortgage_interest_rate') ?
																<SimpleRow
																	content={mortgage.mortgage_interest_rate}
																	title="Interest Rate"
																/> : null
															}
															{ _.get(mortgage, 'mortgage_loan_type') ?
																<SimpleRow
																	content={mortgage.mortgage_loan_type}
																	title="Loan Type"
																/> : null
															}
															{ _.get(mortgage, 'mortgage_term') ?
																<SimpleRow
																	content={mortgage.mortgage_term}
																	title="Term"
																/> : null
															}
															{ _.get(mortgage, 'mtg_sec_cat') ?
																<SimpleRow
																	content={mortgage.mtg_sec_cat}
																	title="Category"
																/> : null
															}
															{ _.get(mortgage, 'mortgage_date.date.month') ?
																<SimpleRow
																	content={constants.months[mortgage.mortgage_date.date.month] + ' ' + mortgage.mortgage_date.date.day + ' ' + mortgage.mortgage_date.date.year}
																	title="Mortgage Date"
																/> : null
															}
															{ _.get(mortgage, 'mortgage_due_date.date.month') ?
																<SimpleRow
																	content={constants.months[mortgage.mortgage_due_date.date.month] + ' ' + mortgage.mortgage_due_date.date.day + ' ' + mortgage.mortgage_due_date.date.year}
																	title="Mortgage Due Date"
																/> : null
															}
															{ _.get(mortgage, 'mortgage_refi_flag') ?
																<SimpleRow
																	content={mortgage.mortgage_refi_flag}
																	title="Mortgage Refinance"
																/> : null
															}
															{ _.get(mortgage, 'register_entries[0].transaction_type') ?
																<SimpleRow
																	content={mortgage.register_entries[0].transaction_type}
																	title="Transaction Type"
																/> : null
															}
			
														</div>
													)
												})}
											</div> : null
										}								

										{ ownership.sellers ? 
											<div className="subgroup">
												<h3>Seller(s)</h3>
												{_.map(ownership.sellers, (seller, i) => {
													return(
														<div className="seller" key={uuid.v4()}>
															{ _.get(seller, 'names[0].display') ?
																<SimpleRow
																	content={seller.names[0].display}
																	title="Name"
																/> : null
															}
															{ _.get(seller, 'corporate_affiliations[0].company_names[0].name') ?
																<SimpleRow
																	content={seller.corporate_affiliations[0].company_names[0].name}
																	title=" Company Name"
																/> : null
															}
															{ _.get(seller, 'locations[0].address.display') ?
																<SimpleRow
																	content={seller.locations[0].address.display}
																	title="Address"
																/> : null
															}
			
														</div>
													)
												})}
											</div> : null
										}
										
									</div>
								))}
							</div> : null 
						}

						{ _.get(property,'property_taxes.assessments') ?
							<div className="subgroup">
								<h3>Assessment Details</h3>
								{ property.property_taxes.assessments.map((assessment) => (
									assessment.assessed_values ?
										assessment.assessed_values.map((assessmentDetail) => (
											<div className="assessment-detail" key={uuid.v4()}>
												{ _.get(assessmentDetail, 'assessed_year') ?
													<h4>Assessment Year: {assessmentDetail.assessed_year}</h4> : null
												}
												{ _.get(assessmentDetail, 'assessed_land_value') ?
													<SimpleRow
														content={assessmentDetail.assessed_land_value}
														title="Assessed Land Value"
													/> : null
												}
												{ _.get(assessmentDetail, 'assessed_improvement_value') ?
													<SimpleRow
														content={assessmentDetail.assessed_improvement_value}
														title="Assessed Improvement Value"
													/> : null
												}
												{ _.get(assessmentDetail, 'assessed_total_value') ?
													<SimpleRow
														content={assessmentDetail.assessed_total_value}
														title="Assessed Total Value"
													/> : null
												}
												{ _.get(assessmentDetail, 'tax_amount') ?
													<SimpleRow
														content={libs._getFormattedCurrency(assessmentDetail.tax_amount)}
														title="Tax Amount"
													/> : null
												}
												{ _.get(assessmentDetail, 'tax_year') ?
													<SimpleRow
														content={assessmentDetail.tax_year}
														title="Tax Year"
													/> : null
												}
												
											</div>
										)) : null
								))}
							</div> : null 
						}
					</div>
				)) }
			</section>
		</div>
	);
};


CurrentProperties.propTypes = {
	currentProperties: React.PropTypes.array.isRequired
};

export default CurrentProperties;
