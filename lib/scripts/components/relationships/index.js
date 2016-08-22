import constants from '../../constants/pubRecConstants';
import React from 'react';
import TeaserLink from '../TeaserLink';
import _ from 'lodash';
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
			<section id="relationships" className="widget">
				<h2 className="title">Possible Relationships</h2>

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

									{ _.has(relationship,'type') ?
										<div>
											<div className="label">
												<h4>Relationship Type</h4>
											</div>
											<div className="content">
												{relationship.type === 'other' ? 'Friend' : relationship.type}
											</div>
										</div>
									: null }

									<TeaserLink
										teaser={relationship}
										classes="btn-link btn"
										recordType={constants.recordTypes.PERSON}> Person Report
									</TeaserLink>
								</li>
							)) }
						</ul>
					</div>
						: <DefaultColumn
							name={name}
							icon="related-persons"
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
