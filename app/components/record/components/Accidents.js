import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import Sticky from 'react-stickynode';
import constants from 'constants/pubRecConstants';
import SimpleRow from 'components/shared/SimpleRow';
import {STATES} from 'utils/states';
import * as libs from 'utils/libs';

const Accidents = (props) => {
	let { accidents } = props;
	return (
		<section id="accidents" className="widget premium">
			<Sticky>
				<h2 className="title">Possible Accidents</h2>
			</Sticky>
			{ accidents.map((accident) => (
				<div className="document accident-individual" key={uuid.v4()}>
					<div className="label label-full">
						<h3 className="document-title">
							{`${constants.months[accident.accident_date.month]} ${accident.accident_date.day} ${accident.accident_date.year} `}
							{`${_.get(accident,'accident_location.city') ? ' in ' + accident.accident_location.city : ''} ${accident.accident_state ? STATES[accident.accident_state] : null}`}
						</h3>
					</div>
					{ _.get(accident, 'accident_location.city_town_name') ?
						<SimpleRow
							content={accident.accident_location.city_town_name}
							title="Town name"
						/> : null
					}
					{ _.get(accident, 'accident_location.county') ?
						<SimpleRow
							content={accident.accident_location.county}
							title="County"
						/> : null
					}
					{ _.get(accident, 'accident_location.at_intersect_of') ?
						<SimpleRow
							content={accident.accident_location.at_intersect_of}
							title="Intersection"
						/> : null
					}
					{ _.get(accident, 'accident_location.state_road_highway_name') ?
						<SimpleRow
							content={accident.accident_location.state_road_highway_name}
							title="Road or Hightway Name"
						/> : null
					}
					{ _.get(accident, 'conditions.number_of_lanes') ?
						<SimpleRow
							content={accident.conditions.number_of_lanes}
							title="Number of Lanes"
						/> : null
					}
					{ _.get(accident, 'conditions.location_type') ?
						<SimpleRow
							content={accident.conditions.location_type}
							title="Location Type"
						/> : null
					}
					{ _.get(accident, 'conditions.rural_urban') ?
						<SimpleRow
							content={accident.conditions.rural_urban}
							title="Area Type"
						/> : null
					}
					{ _.get(accident, 'conditions.site_location') ?
						<SimpleRow
							content={accident.conditions.site_location}
							title="Site Information"
						/> : null
					}
					{ _.get(accident, 'accident_time.hour_of_accident') && _.get(accident, 'accident_time.minute_of_accident') ?
						<SimpleRow
							content={`${accident.accident_time.hour_of_accident}:${accident.accident_time.minute_of_accident}`}
							title="Time of Accident"
						/> : null
					}
					{ _.get(accident, 'accident_time.hour_off_arrived') && _.get(accident, 'accident_time.minute_off_arrived') ?
						<SimpleRow
							content={`${accident.accident_time.hour_off_arrived}:${accident.accident_time.minute_off_arrived}`}
							title="Time Officer Arrived"
						/> : null
					}
					{ _.get(accident, 'investigation.investigation_agent.agent_department_name') ?
						<SimpleRow
							content={accident.investigation.investigation_agent.agent_department_name}
							title="Investigating Agency"
						/> : null
					}
					{ _.get(accident, 'investigation.investigation_agent.agent_name') ?
						<SimpleRow
							content={accident.investigation.investigation_agent.agent_name}
							title="Investigating Agent Name"
						/> : null
					}
					{ _.get(accident, 'investigation.investigation_agent.agent_rank') ?
						<SimpleRow
							content={accident.investigation.investigation_agent.agent_rank}
							title="Investigating Agent Rank"
						/> : null
					}
					{ _.get(accident, 'investigation.investigation_agent.agent_report_number') ?
						<SimpleRow
							content={accident.investigation.investigation_agent.agent_report_number}
							title="Investigating Agent Report Number"
						/> : null
					}
					{ _.get(accident, 'investigation.investigation_agent.agent_id_badge_number') ?
						<SimpleRow
							content={accident.investigation.investigation_agent.agent_id_badge_number}
							title="Investigating Agent Badge Number"
						/> : null
					}
					{ accident.statistics ?
						<div className="subgroup subgroup-singular">
							<h3>Accident Overview</h3>
							{ accident.statistics.total_number_of_drivers ?
								<SimpleRow
									content={accident.statistics.total_number_of_drivers}
									title="Total Number of Drivers Involved"
								/> : null
							}
							{ accident.statistics.total_number_of_fatalities ?
								<SimpleRow
									content={accident.statistics.total_number_of_fatalities}
									title="Total Number of Fatalities"
								/> : null
							}
							{ accident.statistics.total_number_of_injuries ?
								<SimpleRow
									content={accident.statistics.total_number_of_injuries}
									title="Total Number of Injuries"
								/> : null
							}
							{ accident.statistics.total_number_of_pedalcyclists ?
								<SimpleRow
									content={accident.statistics.total_number_of_pedalcyclists}
									title="Total Number of Cyclists"
								/> : null
							}
							{ accident.statistics.total_number_of_pedestrians ?
								<SimpleRow
									content={accident.statistics.total_number_of_pedestrians}
									title="Total Number of Pedestrians"
								/> : null
							}
							{ accident.statistics.total_number_of_persons ?
								<SimpleRow
									content={accident.statistics.total_number_of_persons}
									title="Total Number of People Involved"
								/> : null
							}

							{ !accident.statistics.total_number_of_persons && accident.statistics.total_number_of_non_traffic_fatal ?
								<SimpleRow
									content={accident.statistics.total_number_of_non_traffic_fatal}
									title="Total Number of People Involved"
								/> : null
							}
							{ accident.statistics.total_number_of_vehicles ?
								<SimpleRow
									content={accident.statistics.total_number_of_vehicles}
									title="Total Number of Vehicles Involved"
								/> : null
							}
							{ accident.statistics.total_property_damage && accident.statistics.total_property_damage.replace(/\b0+/g, '') ?
								<SimpleRow
									content={libs._getFormattedCurrency(accident.statistics.total_property_damage.replace(/\b0+/g, ''))}
									title="Total Amount of Property Damage"
								/> : null
							}
							{ accident.statistics.total_vehicle_damage && accident.statistics.total_vehicle_damage.replace(/\b0+/g, '') ?
								<SimpleRow
									content={libs._getFormattedCurrency(accident.statistics.total_vehicle_damage.replace(/\b0+/g, ''))}
									title="Total Amount of Vehicle Damage"
								/> : null
							}

						</div>
					  : null
					}
					{ accident.conditions ?
						<div className="subgroup subgroup-singular">
							<h3>Conditions At Time of Accident</h3>
							{ accident.conditions.alcohol_drug ?
								<SimpleRow
									content={accident.conditions.alcohol_drug}
									title="Alcohol or Drug Related"
								/> : null
							}
							{ accident.conditions.damage_severity ?
								<SimpleRow
									content={accident.conditions.damage_severity}
									title="Severity of Damage to Vehicles"
								/> : null
							}
							{ accident.conditions.injury_severity ?
								<SimpleRow
									content={accident.conditions.injury_severity}
									title="Severity of Injuries"
								/> : null
							}
							{ accident.conditions.first_harmful_event ?
								<SimpleRow
									content={accident.conditions.first_harmful_event}
									title="First Event"
								/> : null
							}
							{ accident.conditions.second_harmful_event ?
								<SimpleRow
									content={accident.conditions.second_harmful_event}
									title="Second Event"
								/> : null
							}

							{ accident.conditions.insurance ?
								<SimpleRow
									content={accident.conditions.insurance}
									title="Insurance Status of Parties Involved"
								/> : null
							}

							{ accident.conditions.light_condition ?
								<SimpleRow
									content={accident.conditions.light_condition}
									title="Lighting Conditions"
								/> : null
							}
							{ accident.conditions.weather ?
								<SimpleRow
									content={accident.conditions.weather}
									title="Weather Conditions"
								/> : null
							}
							{ accident.conditions.road_surface_condition ?
								<SimpleRow
									content={accident.conditions.road_surface_condition}
									title="Road Surface Condition"
								/> : null
							}

						</div>
					  : null
					}
					{ accident.vehicles ?
						<div className="subgroup">
							<h3>Vehicles Involved</h3>
							{_.map(accident.vehicles, (vehicle, i) => {
								return(
									<div className="vehicle" key={uuid.v4()}>
										<h4>{`${_.get(vehicle, 'year', '')} ${_.get(vehicle, 'make', '')} ${_.get(vehicle, 'model', '')}`}</h4>

										{ _.get(vehicle, 'fault') ?
											<SimpleRow
												content={vehicle.fault}
												title="Vehicle at Fault Status"
											/> : null
										}
										{ _.get(vehicle, 'tag_number') ?
											<SimpleRow
												content={vehicle.tag_number}
												title="License Plate Number"
											/> : null
										}
										{ _.get(vehicle, 'id_number') ?
											<SimpleRow
												content={vehicle.id_number}
												title="VIN"
											/> : null
										}
										{ _.get(vehicle, 'type') ?
											<SimpleRow
												content={vehicle.type}
												title="Vehicle Type"
											/> : null
										}
										{ _.get(vehicle, 'use') ?
											<SimpleRow
												content={vehicle.use}
												title="Vehicle Use"
											/> : null
										}
										{ _.get(vehicle, 'registered_state') ?
											<SimpleRow
												content={vehicle.registered_state}
												title="Registered State"
											/> : null
										}
										{ _.get(vehicle, 'insurance_company') ?
											<SimpleRow
												content={vehicle.insurance_company}
												title="Insurance Company"
											/> : null
										}
										{ _.get(vehicle, 'insurance_policy_number') ?
											<SimpleRow
												content={vehicle.insurance_policy_number}
												title="Insurance Policy Number"
											/> : null
										}
										{ _.get(vehicle, 'passengers') ?
											<SimpleRow
												content={vehicle.passengers.length}
												title="Number of Passengers"
											/> : null
										}
										{ _.get(vehicle, 'total_occupants') ?
											<SimpleRow
												content={vehicle.total_occupants.replace(/\b0+/g, '')}
												title="Total Number of Occupants"
											/> : null
										}
										{ _.get(vehicle, 'posted_speed') ?
											<SimpleRow
												content={vehicle.posted_speed}
												title="Posted Speed"
											/> : null
										}
										{ _.get(vehicle, 'travel_on') ?
											<SimpleRow
												content={vehicle.travel_on}
												title="Vehicle Traveling On Road"
											/> : null
										}
										{ _.get(vehicle, 'travel_direction') ?
											<SimpleRow
												content={vehicle.travel_direction}
												title="Vehicle Direction"
											/> : null
										}
										{ _.get(vehicle, 'estimated_speed') && vehicle.estimated_speed !== 'NUL' ?
											<SimpleRow
												content={vehicle.estimated_speed}
												title="Estimated Speed"
											/> : null
										}
										{ _.get(vehicle, 'movement') ?
											<SimpleRow
												content={vehicle.movement}
												title="Movement of Vehicle at Time of Accident"
											/> : null
										}
										{ _.get(vehicle, 'moving_violation') ?
											<SimpleRow
												content={vehicle.moving_violation}
												title="Moving Violation"
											/> : null
										}
										{ _.get(vehicle, 'point_of_impact') ?
											<SimpleRow
												content={vehicle.point_of_impact}
												title="Point of Impact"
											/> : null
										}
										{ _.get(vehicle, 'estimated_damage') ?
											<SimpleRow
												content={libs._getFormattedCurrency(vehicle.estimated_damage.replace(/\b0+/g, ''))}
												title="Estimated Damage to Vehicle"
											/> : null
										}
										{ _.get(vehicle, 'damage_type') ?
											<SimpleRow
												content={vehicle.damage_type}
												title="Damage Type"
											/> : null
										}
										{ _.get(vehicle, 'owner_driver') ?
											<SimpleRow
												content={vehicle.owner_driver}
												title="Driver Status"
											/> : null
										}

										{ _.get(vehicle, 'driver') ?
											<h5>Driver Information</h5>
											: null
										}

										{ _.get(vehicle, 'driver.individual.name.first') || _.get(vehicle,'driver.individual.name.last') ?
											<SimpleRow
												content={_.get(vehicle,'driver.individual.name.first', '') + ' ' + _.get(vehicle, 'driver.individual.name.last')}
												title="Driver Name"
											/> : null
										}
										{ _.get(vehicle, 'driver.individual.dob.month') &&  vehicle.driver.individual.dob.month ?
											<SimpleRow
												content={constants.months[vehicle.driver.individual.dob.month] + ', ' + vehicle.driver.individual.dob.day + ' ' + vehicle.driver.individual.dob.year }
												title="Driver's Date of Birth"
											/> : null
										}
										{ _.get(vehicle, 'driver.individual.race') ?
											<SimpleRow
												content={vehicle.driver.individual.race}
												title="Driver Ethnicity"
											/> : null
										}
										{ _.get(vehicle, 'driver.individual.sex') ?
											<SimpleRow
												content={vehicle.driver.individual.sex}
												title="Driver's Gender"
											/> : null
										}
										{ _.get(vehicle, 'driver.individual.address') ?
											<SimpleRow
												content={
													vehicle.driver.individual.address.street_number + ' ' +
													vehicle.driver.individual.address.street_pre_direction + ' ' +
													vehicle.driver.individual.address.street_name + ' ' +
													vehicle.driver.individual.address.street_post_direction + ' ' +
													vehicle.driver.individual.address.street_suffix + ' ' +
													vehicle.driver.individual.address.city + ' ' +
													vehicle.driver.individual.address.state + ', ' +
													vehicle.driver.individual.address.zip5
												}
												title="Driver's Address"
											/> : null
										}
										{ _.get(vehicle, 'driver.driver_license.license_state') ?
											<SimpleRow
												content={vehicle.driver.driver_license.license_state}
												title="Driver's License State"
											/> : null
										}
										{ _.get(vehicle, 'driver.driver_license.license_type') ?
											<SimpleRow
												content={vehicle.driver.driver_license.license_type}
												title="Driver's License Type"
											/> : null
										}
										{ _.get(vehicle, 'driver.driver_license_number_good_bad') ?
											<SimpleRow
												content={vehicle.driver.driver_license_number_good_bad}
												title="Driver's License Number Status"
											/> : null
										}

										{ _.get(vehicle, 'driver.individual.first_contribute_cause') ?
											<SimpleRow
												content={vehicle.driver.individual.first_contribute_cause}
												title="Contributed to Cause of Accident"
											/> : null
										}

										{ _.get(vehicle, 'driver.individual.second_contribute_cause') ?
											<SimpleRow
												content={vehicle.driver.individual.second_contribute_cause}
												title="Contributed to Cause of Accident"
											/> : null
										}

										{ _.get(vehicle, 'driver.individual.citations') ?
											<SimpleRow
												content={vehicle.driver.individual.citations.length}
												title="Citations Received"
											/> : null
										}

										{ _.get(vehicle, 'driver.individual.alcohol_drug') ?
											<SimpleRow
												content={vehicle.driver.individual.alcohol_drug}
												title="Alcohol or Drugs Involved"
											/> : null
										}

										{ _.get(vehicle, 'driver.individual.injury_severity') ?
											<SimpleRow
												content={vehicle.driver.individual.injury_severity}
												title="Severity of Injury"
											/> : null
										}

										{ _.get(vehicle, 'driver.individual.bac_test_type') ?
											<SimpleRow
												content={vehicle.driver.individual.bac_test_type}
												title="Blood Alcohol Test Type"
											/> : null
										}

										{ _.get(vehicle, 'driver.individual.bac_test_results') ?
											<SimpleRow
												content={vehicle.driver.individual.bac_test_results}
												title="Blood Alcohol Test Results"
											/> : null
										}

										{ _.get(vehicle, 'driver.recommand_re_exam') ?
											<SimpleRow
												content={vehicle.driver.recommand_re_exam}
												title="Driver's Ability"
											/> : null
										}

										{ _.get(vehicle, 'owner') ?
											<h5>Owner Information</h5>
											: null
										}
										{ _.get(vehicle, 'owner.name.first') || _.get(vehicle,'owner.name.last') ?
											<SimpleRow
												content={_.get(vehicle,'owner.name.first', '') + ' ' + _.get(vehicle, 'owner.name.last')}
												title="Owner Name"
											/> : null
										}
										{ _.get(vehicle, 'owner.company_name') ?
											<SimpleRow
												content={vehicle.owner.company_name}
												title="Company name"
											/> : null
										}
										{ _.get(vehicle, 'owner.dob.month') &&  vehicle.owner.dob.month ?
											<SimpleRow
												content={constants.months[vehicle.owner.dob.month] + ', ' + vehicle.owner.dob.day + ' ' + vehicle.owner.dob.year }
												title="Owner's Date of Birth"
											/> : null
										}
										{ _.get(vehicle, 'owner.race') ?
											<SimpleRow
												content={vehicle.owner.race}
												title="Owner Ethnicity"
											/> : null
										}
										{ _.get(vehicle, 'owner.sex') ?
											<SimpleRow
												content={vehicle.owner.sex}
												title="Owner's Gender"
											/> : null
										}
										{ _.get(vehicle, 'owner.address') ?
											<SimpleRow
												content={
													vehicle.owner.address.street_number + ' ' +
													vehicle.owner.address.street_pre_direction + ' ' +
													vehicle.owner.address.street_name + ' ' +
													vehicle.owner.address.street_post_direction + ' ' +
													vehicle.owner.address.street_suffix + ' ' +
													vehicle.owner.address.city + ' ' +
													vehicle.owner.address.state + ', ' +
													vehicle.owner.address.zip5
												}
												title="Owner's Address"
											/> : null
										}

										{ vehicle.passengers ?
											<div className="subgroup">
												<h3>Passengers</h3>
												{_.map(vehicle.passengers, (passenger, i) => {
													return (
														<div className="passenger" key={uuid.v4()}>
															{ _.get(passenger, 'name.first') || _.get(passenger,'name.last') ?
																<SimpleRow
																	content={_.get(passenger,'name.first', '') + ' ' + _.get(passenger, 'name.last', '')}
																	title="Passenger Name"
																/> : null
															}
															{ _.get(passenger, 'age') ?
																<SimpleRow
																	content={passenger.age}
																	title="Passenger's Age"
																/> : null
															}
															{ _.get(passenger, 'gender') ?
																<SimpleRow
																	content={passenger.gender}
																	title="Passenger's Gender"
																/> : null
															}
															{ _.get(passenger, 'address') ?
																<SimpleRow
																	content={
																		passenger.address.street_number + ' ' +
																		passenger.address.street_pre_direction + ' ' +
																		passenger.address.street_name + ' ' +
																		passenger.address.street_post_direction + ' ' +
																		passenger.address.street_suffix + ' ' +
																		passenger.address.city + ' ' +
																		passenger.address.state + ', ' +
																		passenger.address.zip5
																	}
																	title="Passenger's Address"
																/> : null
															}
														</div>
													);
												})}
											</div> : null
										}

									</div>
								);
							})}
						</div> : null
					}

					{ accident.pedestrians ?
						<div className="subgroup">
							<h3>Pedestrians Involved</h3>
							{_.map(accident.pedestrians, (pedestrian, i) => {
								return (
									<div className="pedestrian" key={uuid.v4()}>
										<h4>{`${_.get(pedestrian, 'individual.name.first', '')} ${_.get(pedestrian, 'individual.name.last', '')}`}</h4>


										{ _.get(pedestrian, 'individual.dob.month') &&  pedestrian.individual.dob.month ?
											<SimpleRow
												content={constants.months[pedestrian.individual.dob.month] + ', ' + pedestrian.individual.dob.day + ' ' + pedestrian.individual.dob.year }
												title="Date of Birth"
											/> : null
										}
										{ _.get(pedestrian, 'individual.race') ?
											<SimpleRow
												content={pedestrian.individual.race}
												title="Ethnicity"
											/> : null
										}
										{ _.get(pedestrian, 'individual.sex') ?
											<SimpleRow
												content={pedestrian.individual.sex}
												title=" Gender"
											/> : null
										}
										{ _.get(pedestrian, 'individual.address') ?
											<SimpleRow
												content={
													pedestrian.individual.address.street_number + ' ' +
													pedestrian.individual.address.street_pre_direction + ' ' +
													pedestrian.individual.address.street_name + ' ' +
													pedestrian.individual.address.street_post_direction + ' ' +
													pedestrian.individual.address.street_suffix + ' ' +
													pedestrian.individual.address.city + ' ' +
													pedestrian.individual.address.state + ', ' +
													pedestrian.individual.address.zip5
												}
												title="Address"
											/> : null
										}

										{ _.get(pedestrian, 'individual.first_contribute_cause') ?
											<SimpleRow
												content={pedestrian.individual.first_contribute_cause}
												title="Contributed to Cause of Accident"
											/> : null
										}

										{ _.get(pedestrian, 'individual.second_contribute_cause') ?
											<SimpleRow
												content={pedestrian.individual.second_contribute_cause}
												title="Contributed to Cause of Accident"
											/> : null
										}

										{ _.get(pedestrian, 'individual.citations') ?
											<SimpleRow
												content={pedestrian.individual.citations.length}
												title="Citations Received"
											/> : null
										}

										{ _.get(pedestrian, 'individual.alcohol_drug') ?
											<SimpleRow
												content={pedestrian.individual.alcohol_drug}
												title="Alcohol or Drugs Involved"
											/> : null
										}

										{ _.get(pedestrian, 'individual.injury_severity') ?
											<SimpleRow
												content={pedestrian.individual.injury_severity}
												title="Severity of Injury"
											/> : null
										}

										{ _.get(pedestrian, 'individual.bac_test_type') ?
											<SimpleRow
												content={pedestrian.individual.bac_test_type}
												title="Blood Alcohol Test Type"
											/> : null
										}

										{ _.get(pedestrian, 'individual.bac_test_results') ?
											<SimpleRow
												content={pedestrian.individual.bac_test_results}
												title="Blood Alcohol Test Results"
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

Accidents.propTypes = {
	accidents: React.PropTypes.array.isRequired
};

export default Accidents;
