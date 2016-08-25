import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import { Sticky } from 'react-sticky';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';

const Accidents = (props) => {
	let { accidents } = props;

	return (
		<div className="multi-container">
			<section id="accidents" className="widget multi-widget premium">
				<Sticky>
					<h2 className="title">Possible Accidents</h2>
				</Sticky>
				{ accidents.map((accident, index) => (
					<div className="accident widget" key={index}>
						<h3 className="title">{(_.has(accident,'accident_time.day_of_week') ? accident.accident_time.day_of_week : null )+ ' ' +
							constants.months[accident.accident_date.month] + ', ' + accident.accident_date.day + ' ' + accident.accident_date.year + ' In ' +
							(_.has(accident,'accident_location.city_town_name') ? (accident.accident_location.city_town_name + ', ') : '') +
						accident.accident_state}
						</h3>
						{ _.has(accident, 'vehicles[0]') ? (
							accident.vehicles.map((vehicle) => (
								<div className="vehicle widget">
									<h4>Vehicle Involved</h4>

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
									{ _.has(vehicle, 'make') && _.has(vehicle, 'model') ?
										<SimpleRow
											key={`make-model-${uuid.v4()}`}
											content={vehicle.make + ' ' + vehicle.model}
											title="Vehicle Make & Model"
										/> : null
									}
									{ _.has(vehicle, 'year') ?
										<SimpleRow
											key={`year-${uuid.v4()}`}
											content={vehicle.year}
											title="Vehicle Year"
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
						)): '' }
					</div>
				)) }
			</section>
		</div>
	);
};

Accidents.propTypes = {
	accidents: React.PropTypes.array.isRequired
};

export default Accidents;
