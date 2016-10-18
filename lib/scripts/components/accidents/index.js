import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import Sticky from 'react-stickynode';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';
import moment from 'moment';
import {STATES} from '../../utils/states';
import * as libs from '../../utils/libs';

const Accidents = (props) => {
	let { accidents } = props;
	console.log(accidents);
	// Only display accidents with vehicles
	//accidents = _.filter(accidents, 'vehicles');

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
								{`${_.get(accident,'accident_location.city') ? ' in ' + accident.accident_location.city : null} ${accident.accident_state ? STATES[accident.accident_state] : null}`}
							</h3>
						</div>
						{ _.get(accident, 'accident_location.city_town_name') ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={accident.accident_location.city_town_name}
								title="Town name"
							/> : null
						}
						{ _.get(accident, 'accident_location.county') ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={accident.accident_location.county}
								title="County"
							/> : null
						}
						{ _.get(accident, 'accident_location.at_intersect_of') ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={accident.accident_location.at_intersect_of}
								title="Intersection"
							/> : null
						}
						{ _.get(accident, 'accident_location.state_road_highway_name') ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={accident.accident_location.state_road_highway_name}
								title="Road or Hightway Name"
							/> : null
						}
						{ _.get(accident, 'conditions.number_of_lanes') ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={accident.conditions.number_of_lanes}
								title="Number of Lanes"
							/> : null
						}
						{ _.get(accident, 'conditions.location_type') ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={accident.conditions.location_type}
								title="Location Type"
							/> : null
						}
						{ _.get(accident, 'conditions.rural_urban') ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={accident.conditions.rural_urban}
								title="Area Type"
							/> : null
						}
						{ _.get(accident, 'conditions.site_location') ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={accident.conditions.site_location}
								title="Site Information"
							/> : null
						}
						{ _.get(accident, 'accident_time.hour_of_accident') && _.get(accident, 'accident_time.minute_of_accident') ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={moment(`${accident.accident_time.hour_of_accident}:${accident.accident_time.minute_of_accident}`, 'hhmm').format('H:mm')}
								title="Time of Accident"
							/> : null
						}
						{ _.get(accident, 'accident_time.hour_off_arrived') && _.get(accident, 'accident_time.minute_off_arrived') ?
							<SimpleRow
								key={`record-date-${uuid.v4()}`}
								content={moment(`${accident.accident_time.hour_off_arrived}:${accident.accident_time.minute_off_arrived}`, 'hhmm').format('HH:mm')}
								title="Time Officer Arrived"
							/> : null
						}
						{ accident.statistics?
							<div className="subgroup subgroup-singular">
								<h3>Accident Overview</h3>
								{ accident.statistics.total_number_of_drivers ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.statistics.total_number_of_drivers}
										title="Total Number of Drivers Involved"
									/> : null
								}
								{ accident.statistics.total_number_of_fatalities ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.statistics.total_number_of_fatalities}
										title="Total Number of Fatalities"
									/> : null
								}
								{ accident.statistics.total_number_of_injuries ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.statistics.total_number_of_injuries}
										title="Total Number of Injuries"
									/> : null
								}
								{ accident.statistics.total_number_of_non_traffic_fatalities ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.statistics.total_number_of_non_traffic_fatalities}
										title="Total Number of Non Traffic Fatalities"
									/> : null
								}
								{ accident.statistics.total_number_of_pedalcyclists ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.statistics.total_number_of_pedalcyclists}
										title="Total Number of Cyclists"
									/> : null
								}
								{ accident.statistics.total_number_of_pedestrians ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.statistics.total_number_of_pedestrians}
										title="Total Number of Pedestrians"
									/> : null
								}
								{ accident.statistics.total_number_of_persons ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.statistics.total_number_of_persons}
										title="Total Number of People Involved"
									/> : null
								}
								{ accident.statistics.total_number_of_vehicles ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.statistics.total_number_of_vehicles}
										title="Total Number of Vehicles Involved"
									/> : null
								}
								{ accident.statistics.total_property_damage && accident.statistics.total_property_damage.replace(/\b0+/g, '') ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={libs._getFormattedCurrency(accident.statistics.total_property_damage.replace(/\b0+/g, ''))}
										title="Total Amount of Property Damage"
									/> : null
								}
								{ accident.statistics.total_vehicle_damage && accident.statistics.total_vehicle_damage.replace(/\b0+/g, '') ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
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
										key={`record-date-${uuid.v4()}`}
										content={accident.conditions.alcohol_drug}
										title="Alcohol or Drug Related"
									/> : null
								}
								{ accident.conditions.damage_severity ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.conditions.damage_severity}
										title="Severity of Damage to Vehicles"
									/> : null
								}
								{ accident.conditions.injury_severity ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.conditions.injury_severity}
										title="Severity of Injuries"
									/> : null
								}
								{ accident.conditions.first_harmful_event ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.conditions.first_harmful_event}
										title="First Event"
									/> : null
								}
								{ accident.conditions.second_harmful_event ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.conditions.second_harmful_event}
										title="Second Event"
									/> : null
								}
								{ accident.conditions.insurance ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.conditions.insurance}
										title="Insurance Status of Parties Involved"
									/> : null
								}
								{ accident.conditions.second_harmful_event ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.conditions.second_harmful_event}
										title="Second Event"
									/> : null
								}
								{ accident.conditions.investigation_agent ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.conditions.investigation_agent}
										title="Investigating Agency"
									/> : null
								}
								{ accident.conditions.light_condition ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.conditions.light_condition}
										title="Lighting Conditions"
									/> : null
								}
								{ accident.conditions.weather ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.conditions.weather}
										title="Weather Conditions"
									/> : null
								}
								{ accident.conditions.road_surface_condition ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.conditions.road_surface_condition}
										title="Road Surface Condition"
									/> : null
								}
								{ accident.conditions.location_type ?
									<SimpleRow
										key={`record-date-${uuid.v4()}`}
										content={accident.conditions.second_harmful_event}
										title="Second Event"
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
											{ _.has(vehicle, 'driver.individual.name.first') ?
												<SimpleRow
													key={`record-date-${uuid.v4()}`}
													content={vehicle.driver.individual.name.first + ' ' + vehicle.driver.individual.name.last}
													title="Driver"
												/> : null
											}
											{ _.has(vehicle, 'driver.individual.dob.month') &&  vehicle.driver.individual.dob.month !== '0' ?
												<SimpleRow
													key={`vehicle-dob-${uuid.v4()}`}
													content={constants.months[vehicle.driver.individual.dob.month] + ', ' + vehicle.driver.individual.dob.day + ' ' + vehicle.driver.individual.dob.year }
													title="Driver's Date of Birth"
												/> : null
											}
											{ _.has(vehicle, 'driver.individual.race') ?
												<SimpleRow
													key={`race-${uuid.v4()}`}
													content={vehicle.driver.individual.race}
													title="Race"
												/> : null
											}
											{ _.has(vehicle, 'driver.driver_license.license_state') ?
												<SimpleRow
													key={`driver_license.license_state-${uuid.v4()}`}
													content={vehicle.driver.driver_license.license_state}
													title="Driver's License State"
												/> : null
											}
											{ _.has(vehicle, 'driver.individual.address.street_number') ?
												<SimpleRow
													key={`address-${uuid.v4()}`}
													content={vehicle.driver.individual.address.street_number + ' ' +
														vehicle.driver.individual.address.street_name + ' ' +
														vehicle.driver.individual.address.street_suffix + ', ' +
														vehicle.driver.individual.address.state + ', ' +
													vehicle.driver.individual.address.zip5 }
													title="Vehicle Owner's Address"
												/> : null
											}
	
											{ _.has(vehicle, 'tag_number') ?
												<SimpleRow
													key={`license-${uuid.v4()}`}
													content={vehicle.tag_number}
													title="License Plate Number"
												/> : null
											}
											{ _.has(vehicle, 'id_number') ?
												<SimpleRow
													key={`vin-${uuid.v4()}`}
													content={vehicle.id_number}
													title="VIN"
												/> : null
											}
											{ _.has(vehicle, 'insurance_company') ?
												<SimpleRow
													key={`ins-${uuid.v4()}`}
													content={vehicle.insurance_company}
													title="Insurance Company"
												/> : null
											}
											{ _.has(vehicle, 'insurance_policy_number') ?
												<SimpleRow
													key={`inspolicy-${uuid.v4()}`}
													content={vehicle.insurance_policy_number}
													title="Insurance Policy Number"
												/> : null
											}
											{ _.has(vehicle, 'driver.individual.posted_speed') ?
												<SimpleRow
													key={`posted_speed-${uuid.v4()}`}
													content={vehicle.driver.individual.posted_speed}
													title="Posted Speed"
												/> : null
											}
											{ _.has(vehicle, 'point_of_impact') ?
												<SimpleRow
													key={`point_of_impact-${uuid.v4()}`}
													content={vehicle.point_of_impact}
													title="Point of Impact"
												/> : null
											}
										</div>
									)
								})}
							</div>
						: null }
					</div>
				)) }
			</section>
	);
};

Accidents.propTypes = {
	accidents: React.PropTypes.array.isRequired
};

export default Accidents;
