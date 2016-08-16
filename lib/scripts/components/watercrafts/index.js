import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';

const Watercrafts = (props) => {
	let { watercrafts } = props;

	return (
			<div className='multi-container'>
				<section id='watercrafts' className='widget multi-widget'>
					<h2 className='title'>Watercrafts Owned</h2>
					{ watercrafts.map((watercraft, index) => (
						<div className='license widget' key={index}>
							<h3 className='title'>{watercraft.description.model_year + ' ' + watercraft.description.make}</h3>
							{ (_.has(watercraft, 'owners[0].name.first')  && watercraft.owners[0].name.first != false ) ?
								<SimpleRow
									key={`name-${uuid.v1()}`}
									content={watercraft.owners[0].name.first + ' ' + watercraft.owners[0].name.last}
									title="Owner Name"
								/> : null
							}
							{ (_.has(watercraft, 'owners[0].address.street_name')  && watercraft.owners[0].address.street_name != false ) ?
								<SimpleRow
									key={`address-${uuid.v1()}`}
									content={watercraft.owners[0].address.street_name + ', ' + watercraft.owners[0].address.city + ', ' + watercraft.owners[0].address.zip5 + ', ' + watercraft.owners[0].address.state}
									title="Owner's Address"
								/> : null
							}
							{ (_.has(watercraft, 'registration.number')  && watercraft.registration.number != false ) ?
								<SimpleRow
									key={`registration.number-${uuid.v1()}`}
									content={watercraft.registration.number}
									title="Registration Number"
								/> : null
							}
							{ (_.has(watercraft, 'registration.state_origin')  && watercraft.registration.state_origin != false ) ?
								<SimpleRow
									key={`state_origin-${uuid.v1()}`}
									content={watercraft.registration.state_origin}
									title="Registration State"
								/> : null
							}
							{ (_.has(watercraft, 'registration.registrate_date.month')  && watercraft.registration.registrate_date.month != false ) ?
								<SimpleRow
									key={`registrate_date.month-${uuid.v1()}`}
									content={constants.months[watercraft.registration.registrate_date.month] + ', ' + watercraft.registration.registrate_date.day + ' ' + watercraft.registration.registrate_date.year}
									title="Registration Date"
								/> : null
							}
							{ (_.has(watercraft, 'title.status')  && watercraft.title.status != false ) ?
								<SimpleRow
									key={`title.status-${uuid.v1()}`}
									content={watercraft.title.status}
									title="Title Status"
								/> : null
							}
							{ (_.has(watercraft, 'title.issue_date.month')  && watercraft.title.issue_date.month != false ) ?
								<SimpleRow
									key={`title.issue_date.month-${uuid.v1()}`}
									content={watercraft.title.issue_date.month}
									title="Title Issue Date"
								/> : null
							}
							{ (_.has(watercraft, 'description.class')  && watercraft.description.class != false ) ?
								<SimpleRow
									key={`class-${uuid.v1()}`}
									content={watercraft.description.class}
									title="Class"
								/> : null
							}
							{ (_.has(watercraft, 'description.length')  && watercraft.description.length != false ) ?
								<SimpleRow
									key={`length-${uuid.v1()}`}
									content={watercraft.description.length}
									title="Length"
								/> : null
							}
							{ (_.has(watercraft, 'description.width')  && watercraft.description.width != false ) ?
								<SimpleRow
									key={`width-${uuid.v1()}`}
									content={watercraft.description.width}
									title="Width"
								/> : null
							}
							{ (_.has(watercraft, 'description.use')  && watercraft.description.use != false ) ?
								<SimpleRow
									key={`use-${uuid.v1()}`}
									content={watercraft.description.use}
									title="Use"
								/> : null
							}
							{ (_.has(watercraft, 'description.hull_number')  && watercraft.description.hull_number != false ) ?
								<SimpleRow
									key={`hull2-${uuid.v1()}`}
									content={watercraft.description.hull_number}
									title="Hull Number"
								/> : null
							}
							{ (_.has(watercraft, 'description.hull_type')  && watercraft.description.hull_type != false ) ?
								<SimpleRow
									key={`hull-${uuid.v1()}`}
									content={watercraft.description.hull_type}
									title="Hull Type"
								/> : null
							}
							{ (_.has(watercraft, 'description.propulsion')  && watercraft.description.propulsion != false ) ?
								<SimpleRow
									key={`propulsion-${uuid.v1()}`}
									content={watercraft.description.propulsion}
									title="Propulsion"
								/> : null
							}
							{ (_.has(watercraft, 'description.fuel')  && watercraft.description.fuel != false ) ?
								<SimpleRow
									key={`Fuel-${uuid.v1()}`}
									content={watercraft.description.fuel}
									title="Fuel"
								/> : null
							}
							{ (_.has(watercraft, 'description.vessel_type')  && watercraft.description.vessel_type != false ) ?
								<SimpleRow
									key={`Fuel-${uuid.v1()}`}
									content={watercraft.description.vessel_type}
									title="Vessel Type"
								/> : null
							}

						</div>
					)) }
				</section>
			</div>
	);
}


Watercrafts.propTypes = {
	watercrafts: React.PropTypes.array.isRequired
}

export default Watercrafts;
