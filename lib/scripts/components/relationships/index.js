import constants from '../../constants/pubRecConstants';
import React from 'react';
import SearchLink from '../SearchLink';
import _ from 'lodash';
import Sticky from 'react-stickynode';
import DefaultColumn from '../shared/DefaultColumn';

const Relationships = (props) => {
	let { name, relationships } = props;

	// Fallback Details
	let fallback = {
		title: `Our extensive public records search did not uncover relationship records for ${name}.`,
		content: `We scanned for ${name}'s name among hundreds of millions of records from local, state, and federal databases in all 50 states.`,
	};

	return (
		<div className="multi-container">
			<section id="relationships" className="widget premium">
				<Sticky>
					<h2 className="title">Possible Relationships</h2>
				</Sticky>

				{ relationships.length > 0 ?
					<div className="content content-full">
						<ul className="default">
							{ relationships.map((relationship, i) => (
								<li key={i}>
									<h4>{relationship.names[0].display}</h4>

									{ relationship.available_criminal_records >= 1 ?
										<p>
											<small><strong>({relationship.available_criminal_records}) </strong>
												Possible Criminal Records
											</small>
										</p>
									: null }

									{ relationship.type ?
										<div>
											<div className="label">
												<h4>Relationship Type</h4>
											</div>
											<div className="content">
												<p>{relationship.type === 'other' ? 'Friend' : relationship.type}</p>
											</div>
										</div>
									: null }

									<SearchLink
										criteria={{
											type: constants.recordTypes.PERSON,
											query: {
												firstName: relationship.names[0].first,
												lastName: relationship.names[0].last
											},
											text: relationship.names[0].display
										}}
									classes="btn-link btn"> View Person Report
									</SearchLink>
									<hr/>
								</li>
							)) }
						</ul>
					</div>
						: <DefaultColumn
							name={name}
							icon="relatedPersons"
							title={fallback.title}
							content={fallback.content}
							type="related persons"
						/> }
			</section>
		</div>
	);
};

// Validate props
Relationships.propTypes = {
	name: React.PropTypes.string.isRequired,
	relationships: React.PropTypes.array.isRequired
};

export default Relationships;
