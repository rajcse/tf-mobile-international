import React from 'react';
import _ from 'lodash';
import constants from 'constants/pubRecConstants';
import SimpleRow from 'components/SimpleRow';
import uuid from 'uuid';

// import * as libs from 'utils/libs';

const Trademarks = (props) => {
	let { trademarks } = props;
	return (
		<div className="multi-container">
			<section id="trademarks" className="widget premium">
				<h2 className="title">Trademarks</h2>
				{ trademarks.map((trademark, index) => (
					<div className="document trademark-individual" key={index}>
						{ trademark.registration_number &&
							<div className="label label-full">
								<h3 className="document-title">Registration Number: {trademark.registration_number}</h3>
							</div>
						}

						{ trademark.serial_number &&
							<SimpleRow
								content={trademark.serial_number}
								title="Serial Number"
							/>
						}

						{ trademark.transaction_date &&
							<SimpleRow
								content={`${constants.months[trademark.transaction_date.month]} ${trademark.transaction_date.day} ${trademark.transaction_date.year}`}
								title="Transaction Date"
							/>
						}


						{ trademark.classifications &&
							<div className="subgroup">
								<h3>Classifications</h3>
								{ trademark.classifications.map((classification, i) => (
									<div className="classifications" key={uuid.v4()}>

										{ _.get(classification, 'primary_classification') &&
											<SimpleRow
												content={classification.primary_classification}
												title="Primary Classification"
											/>
										}

										{ _.get(classification, 'status') &&
											<SimpleRow
												content={classification.status}
												title="Status"
											/>
										}

										{ _.get(classification, 'status_date') &&
											<SimpleRow
												content={`${constants.months[classification.status_date.month]} ${classification.status_date.day} ${classification.status_date.year}`}
												title="Status Date"
											/>
										}

										{ _.get(classification, 'first_use_anywhere_date') &&
											<SimpleRow
												content={`${constants.months[classification.first_use_anywhere_date.month]} ${classification.first_use_anywhere_date.day} ${classification.first_use_anywhere_date.year}`}
												title="First Use Date"
											/>
										}

										{ _.get(classification, 'international_classifications') &&
											<div className="subgroup">
												<h3>International</h3>
												<ul>
													{_.map(classification.international_classifications, (intlClassification, i) => {
														return(
															<li className="international-classification" key={uuid.v4()}>
																{ intlClassification }
															</li>
														);
													})}
												</ul>
											</div>
										}

										{ _.get(classification, 'us_classifications') &&
											<div className="subgroup">
												<h3>United States</h3>
												<ul>
													{_.map(classification.us_classifications, (usClassification, i) => {
														return(
															<li className="us-classification" key={uuid.v4()}>
																{ usClassification }
															</li>
														);
													})}
												</ul>
											</div>
										}

									</div>
								))}
							</div>
						}

						{ trademark.filings &&
							<div className="subgroup">
								<h3>Filings</h3>
								{ trademark.filings.map((filing, i) => (
									<div className="filings" key={uuid.v4()}>

										{ _.get(filing, 'mark_identification') &&
											<SimpleRow
												content={filing.mark_identification}
												title="Mark Identification"
											/>
										}

										{ _.get(filing, 'action') &&
											<SimpleRow
												content={filing.action}
												title="Action"
											/>
										}

										{ _.get(filing, 'status') &&
											<SimpleRow
												content={filing.status}
												title="Status"
											/>
										}

										{ _.get(filing, 'status_date') &&
											<SimpleRow
												content={`${constants.months[filing.status_date.month]} ${filing.status_date.day} ${filing.status_date.year}`}
												title="Status Date"
											/>
										}

										{ _.get(filing, 'registration_date') &&
											<SimpleRow
												content={`${constants.months[filing.registration_date.month]} ${filing.registration_date.day} ${filing.registration_date.year}`}
												title="Registration Date"
											/>
										}

										{ _.get(filing, 'current_location') &&
											<SimpleRow
												content={filing.current_location}
												title="Filing Location"
											/>
										}

										{ _.get(filing, 'location_date') &&
											<SimpleRow
												content={`${constants.months[filing.location_date.month]} ${filing.location_date.day} ${filing.location_date.year}`}
												title="First Use Date"
											/>
										}

										{ _.get(filing, 'cancellation') &&
											<SimpleRow
												content={filing.cancellation}
												title="Cancelation"
											/>
										}

										{ _.get(filing, 'cancellation_date') &&
											<SimpleRow
												content={`${constants.months[filing.cancellation_date.month]} ${filing.cancellation_date.day} ${filing.cancellation_date.year}`}
												title="Cancelation Date"
											/>
										}

										{ _.get(filing, 'domestic_representative') &&
											<SimpleRow
												content={filing.domestic_representative}
												title="Domestic Representative"
											/>
										}

										{ _.get(filing, 'attorney') &&
											<SimpleRow
												content={filing.attorney}
												title="Attorney"
											/>
										}

										{ _.get(filing, 'law_office_assigned_location') &&
											<SimpleRow
												content={filing.law_office_assigned_location}
												title="Attorney Office"
											/>
										}

										{ _.get(filing, 'correspondent_address') &&
											<div className="subgroup">
												<h3>Correspondent Address</h3>
												<ul>
													{_.map(filing.correspondent_address, (address, i) => {
														return(
															<li className="address" key={uuid.v4()}>
																{ address }
															</li>
														);
													})}
												</ul>
											</div>
										}

									</div>
								))}
							</div>
						}

						{ trademark.events &&
							<div className="subgroup">
								<h3>Events</h3>
								{ trademark.events.map((event, i) => (
									<div className="events" key={uuid.v4()}>

										{ _.get(event, 'statement_date') &&
											<SimpleRow
												content={`${constants.months[event.statement_date.month]} ${event.statement_date.day} ${event.statement_date.year}`}
												title="Event Date"
											/>
										}

										{ _.get(event, 'statement_type') &&
											<SimpleRow
												content={event.statement_type}
												title="Statement Type"
											/>
										}

										{ _.get(event, 'description_text') &&
											<SimpleRow
												content={event.description_text}
												title="Description"
											/>
										}

										

									</div>
								))}
							</div>
						}

						{ trademark.owners &&
							<div className="subgroup">
								<h3>Owners</h3>
								{ trademark.owners.map((owner, i) => (
									<div className="owners" key={uuid.v4()}>

										{ _.get(owner, 'names[0].display') &&
											<SimpleRow
												content={owner.names[0].display}
												title="Owner Name"
											/>
										}

										{ _.get(owner, 'locations[0].address.display') &&
											<SimpleRow
												content={owner.locations[0].address.display}
												title="Address"
											/>
										}

										{ _.get(owner, 'phone[0].display') &&
											<SimpleRow
												content={owner.phones[0].display}
												title="Phone"
											/>
										}

									</div>
								))}
							</div>
						}

						{ trademark.statements &&
							<div className="subgroup">
								<h3>Statements</h3>
								{ trademark.statements.map((statement, i) => (
									<div className="statements" key={uuid.v4()}>

										{ _.get(statement, 'statement_type') &&
											<SimpleRow
												content={statement.statement_type}
												title="Type"
											/>
										}

										{ _.get(statement, 'primary_classification') &&
											<SimpleRow
												content={statement.primary_classification}
												title="Classification"
											/>
										}

										{ _.get(statement, 'statement_text') &&
											<SimpleRow
												content={statement.statement_text}
												title="Text"
											/>
										}

										{ _.get(statement, 'entry_date') &&
											<SimpleRow
												content={`${constants.months[statement.entry_date.month]} ${statement.entry_date.day} ${statement.entry_date.year}`}
												title="Date"
											/>
										}

										{ _.get(statement, 'note') &&
											<SimpleRow
												content={statement.note}
												title="Note"
											/>
										}

									</div>
								))}
							</div>
						}

						{ trademark.madrid_filings &&
							<div className="subgroup">
								<h3>Madrid Filings</h3>
								{ trademark.madrid_filings.map((filing, i) => (
									<div className="madrid-filings" key={uuid.v4()}>

										{ _.get(filing, 'reference_number') &&
											<SimpleRow
												content={filing.reference_number}
												title="Reference Number"
											/>
										}

										{ _.get(filing, 'filing_date') &&
											<SimpleRow
												content={`${constants.months[filing.filing_date.month]} ${filing.filing_date.day} ${filing.filing_date.year}`}
												title="Filing Date"
											/>
										}

										{ _.get(filing, 'international_registration_number') &&
											<SimpleRow
												content={filing.international_registration_number}
												title="International Registration Number"
											/>
										}

										{ _.get(filing, 'international_registration_date') &&
											<SimpleRow
												content={`${constants.months[filing.international_registration_date.month]} ${filing.international_registration_date.day} ${filing.international_registration_date.year}`}
												title="International Registration Date"
											/>
										}

										{ _.get(filing, 'international_status') &&
											<SimpleRow
												content={filing.international_status}
												title="International Status"
											/>
										}

										{ _.get(filing, 'international_status_date') &&
											<SimpleRow
												content={`${constants.months[filing.international_status_date.month]} ${filing.international_status_date.day} ${filing.international_status_date.year}`}
												title="International Status Date"
											/>
										}

										{ _.get(filing, 'international_renewal_date') &&
											<SimpleRow
												content={`${constants.months[filing.international_renewal_date.month]} ${filing.international_renewal_date.day} ${filing.international_renewal_date.year}`}
												title="International Renewal Date"
											/>
										}

										{ _.get(filing, 'events') &&
											<div className="subgroup">
												<h3>Event(s)</h3>
												{_.map(filing.events, (event, i) => {
													return(
														<div className="events" key={uuid.v4()}>
															{ _.get(event, 'event_date') &&
																<SimpleRow
																	content={`${constants.months[event.event_date.month]} ${event.event_date.day} ${event.event_date.year}`}
																	title="Date"
																/>
															}
															{ _.get(event, 'description_text') &&
																<SimpleRow
																	content={event.description_text}
																	title="Description"
																/>
															}

														</div>
													);
												})}
											</div>
										}

									</div>
								))}
							</div>
						}

					</div>
				)) }
			</section>
		</div>
	);
};


Trademarks.propTypes = {
	trademarks: React.PropTypes.array.isRequired
};

export default Trademarks;
