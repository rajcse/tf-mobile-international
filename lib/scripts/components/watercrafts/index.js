import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import Sticky from 'react-stickynode';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';

const Watercrafts = (props) => {
	let { watercrafts } = props;

	return (
		<div className="multi-container">
			<section id="watercrafts" className="widget multi-widget premium">
				<Sticky>
					<h2 className="title">Watercrafts Owned</h2>
				</Sticky>
				{ watercrafts.map((watercraft, index) => (
					<div className="license widget" key={index}>
						<h3 className="title">{watercraft.description.model_year + ' ' + watercraft.description.make}</h3>
						{ (_.has(watercraft, 'owners[0].name.first')  && watercraft.owners[0].name.first) ?
							<SimpleRow
								key={`name-${uuid.v4()}`}
								content={watercraft.owners[0].name.first + ' ' + watercraft.owners[0].name.last}
								title="Owner Name"
							/> : null
						}
						{ (_.has(watercraft, 'owners[0].address.street_name')  && watercraft.owners[0].address.street_name) ?
							<SimpleRow
								key={`address-${uuid.v4()}`}
								content={watercraft.owners[0].address.street_name + ', ' + watercraft.owners[0].address.city + ', ' + watercraft.owners[0].address.zip5 + ', ' + watercraft.owners[0].address.state}
								title="Owner's Address"
							/> : null
						}
						{ (_.has(watercraft, 'registration.number')  && watercraft.registration.number) ?
							<SimpleRow
								key={`registration.number-${uuid.v4()}`}
								content={watercraft.registration.number}
								title="Registration Number"
							/> : null
						}
						{ (_.has(watercraft, 'registration.state_origin')  && watercraft.registration.state_origin) ?
							<SimpleRow
								key={`state_origin-${uuid.v4()}`}
								content={watercraft.registration.state_origin}
								title="Registration State"
							/> : null
						}
						{ (_.has(watercraft, 'registration.registrate_date.month')  && watercraft.registration.registrate_date.month) ?
							<SimpleRow
								key={`registrate_date.month-${uuid.v4()}`}
								content={constants.months[watercraft.registration.registrate_date.month] + ', ' + watercraft.registration.registrate_date.day + ' ' + watercraft.registration.registrate_date.year}
								title="Registration Date"
							/> : null
						}
						{ (_.has(watercraft, 'title.status')  && watercraft.title.status) ?
							<SimpleRow
								key={`title.status-${uuid.v4()}`}
								content={watercraft.title.status}
								title="Title Status"
							/> : null
						}
						{ (_.has(watercraft, 'title.issue_date.month')  && watercraft.title.issue_date.month) ?
							<SimpleRow
								key={`title.issue_date.month-${uuid.v4()}`}
								content={watercraft.title.issue_date.month}
								title="Title Issue Date"
							/> : null
						}
						{ (watercraft.description.class) ?
							<SimpleRow
								key={`class-${uuid.v4()}`}
								content={watercraft.description.class}
								title="Class"
							/> : null
						}
						{ (watercraft.description.length) ?
							<SimpleRow
								key={`length-${uuid.v4()}`}
								content={watercraft.description.length}
								title="Length"
							/> : null
						}
						{ (watercraft.description.width) ?
							<SimpleRow
								key={`width-${uuid.v4()}`}
								content={watercraft.description.width}
								title="Width"
							/> : null
						}
						{ (watercraft.description.use) ?
							<SimpleRow
								key={`use-${uuid.v4()}`}
								content={watercraft.description.use}
								title="Use"
							/> : null
						}
						{ (watercraft.description.hull_number) ?
							<SimpleRow
								key={`hull2-${uuid.v4()}`}
								content={watercraft.description.hull_number}
								title="Hull Number"
							/> : null
						}
						{ (watercraft.description.hull_type) ?
							<SimpleRow
								key={`hull-${uuid.v4()}`}
								content={watercraft.description.hull_type}
								title="Hull Type"
							/> : null
						}
						{ (watercraft.description.propulsion) ?
							<SimpleRow
								key={`propulsion-${uuid.v4()}`}
								content={watercraft.description.propulsion}
								title="Propulsion"
							/> : null
						}
						{ (watercraft.description.fuel) ?
							<SimpleRow
								key={`Fuel-${uuid.v4()}`}
								content={watercraft.description.fuel}
								title="Fuel"
							/> : null
						}
						{ (watercraft.description.vessel_type) ?
							<SimpleRow
								key={`Fuel-${uuid.v4()}`}
								content={watercraft.description.vessel_type}
								title="Vessel Type"
							/> : null
						}

					</div>
				)) }
			</section>
		</div>
	);
};


Watercrafts.propTypes = {
	watercrafts: React.PropTypes.array.isRequired
};

export default Watercrafts;
