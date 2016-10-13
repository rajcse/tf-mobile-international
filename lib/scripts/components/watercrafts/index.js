import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import Sticky from 'react-stickynode';
import constants from '../../constants/pubRecConstants';
import SimpleRow from '../shared/SimpleRow';

const Watercrafts = (props) => {
	let { watercrafts } = props;
	return (
		<section id="watercrafts" className="widget premium">
			<Sticky>
				<h2 className="title">Possible Watercrafts Owned</h2>
			</Sticky>
			{ watercrafts.map((watercraft, index) => (
				<div className="document watercraft-individual" key={index}>
					
					{ _.get(watercraft, 'description.model_year') && _.get(watercraft, 'description.make') ?
							<div className="label label-full">
								<h3 className="document-title">{watercraft.description.model_year + ' ' + watercraft.description.make}</h3>
							</div>
						: null 
					}
					{ _.get(watercraft, 'owners[0].name.first') ?
						<SimpleRow
							key={`name-${uuid.v4()}`}
							content={watercraft.owners[0].name.first + ' ' + watercraft.owners[0].name.last}
							title="Owner Name"
						/> : null
					}
					{ _.get(watercraft, 'owners[0].address.street_name') ?
						<SimpleRow
							key={`address-${uuid.v4()}`}
							content={watercraft.owners[0].address.street_name + ', ' + watercraft.owners[0].address.city + ', ' + watercraft.owners[0].address.zip5 + ', ' + watercraft.owners[0].address.state}
							title="Owner's Address"
						/> : null
					}
					{ _.get(watercraft, 'registration.number') ?
						<SimpleRow
							key={`registration.number-${uuid.v4()}`}
							content={watercraft.registration.number}
							title="Registration Number"
						/> : null
					}
					{ _.get(watercraft, 'description.vessel_name') ?
						<SimpleRow
							key={`Fuel-${uuid.v4()}`}
							content={watercraft.description.vessel_name}
							title="Vessel Name"
						/> : null
					}
					{ _.get(watercraft, 'description.purchase_price') ?
						<SimpleRow
							key={`Fuel-${uuid.v4()}`}
							content={watercraft.description.purchase_price}
							title="Purchase Price"
						/> : null
					}
					{ _.get(watercraft, 'registration.state_origin') ?
						<SimpleRow
							key={`state_origin-${uuid.v4()}`}
							content={watercraft.registration.state_origin}
							title="Registration State"
						/> : null
					}
					{ _.get(watercraft, 'registration.registrate_date.month') ?
						<SimpleRow
							key={`registrate_date.month-${uuid.v4()}`}
							content={constants.months[watercraft.registration.registrate_date.month] + ', ' + watercraft.registration.registrate_date.day + ' ' + watercraft.registration.registrate_date.year}
							title="Registration Date"
						/> : null
					}
					{ _.get(watercraft, 'title.status') ?
						<SimpleRow
							key={`title.status-${uuid.v4()}`}
							content={watercraft.title.status}
							title="Title Status"
						/> : null
					}
					{ _.get(watercraft, 'title.issue_date.month') ?
						<SimpleRow
							key={`title.issue_date.month-${uuid.v4()}`}
							content={watercraft.title.issue_date.month}
							title="Title Issue Date"
						/> : null
					}
					{ _.get(watercraft, 'description.class') ?
						<SimpleRow
							key={`class-${uuid.v4()}`}
							content={watercraft.description.class}
							title="Class"
						/> : null
					}
					{ _.get(watercraft, 'description.length') ?
						<SimpleRow
							key={`length-${uuid.v4()}`}
							content={watercraft.description.length}
							title="Length"
						/> : null
					}
					{ _.get(watercraft, 'description.width') ?
						<SimpleRow
							key={`width-${uuid.v4()}`}
							content={watercraft.description.width}
							title="Width"
						/> : null
					}
					{ _.get(watercraft, 'description.use') ?
						<SimpleRow
							key={`use-${uuid.v4()}`}
							content={watercraft.description.use}
							title="Use"
						/> : null
					}
					{ _.get(watercraft, 'description.hull_number') ?
						<SimpleRow
							key={`hull2-${uuid.v4()}`}
							content={watercraft.description.hull_number}
							title="Hull Number"
						/> : null
					}
					{ _.get(watercraft, 'description.hull_type') ?
						<SimpleRow
							key={`hull-${uuid.v4()}`}
							content={watercraft.description.hull_type}
							title="Hull Type"
						/> : null
					}
					{ _.get(watercraft, 'description.propulsion') ?
						<SimpleRow
							key={`propulsion-${uuid.v4()}`}
							content={watercraft.description.propulsion}
							title="Propulsion"
						/> : null
					}
					{ _.get(watercraft, 'description.fuel') ?
						<SimpleRow
							key={`Fuel-${uuid.v4()}`}
							content={watercraft.description.fuel}
							title="Fuel"
						/> : null
					}
					{ _.get(watercraft, 'description.vessel_type') ?
						<SimpleRow
							key={`Fuel-${uuid.v4()}`}
							content={watercraft.description.vessel_type}
							title="Vessel Type"
						/> : null
					}

				</div>
			)) }
		</section>
	);
};


Watercrafts.propTypes = {
	watercrafts: React.PropTypes.array.isRequired
};

export default Watercrafts;
