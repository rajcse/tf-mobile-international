import constants from '../../constants/pubRecConstants';
import React from 'react';
import TeaserLink from '../TeaserLink';
import _ from 'lodash';

const Relationships = (props) => {
	let { relationships } = props;

	return (
			<div className='multi-container'>
				<section id='relationships' className='widget multi-widget'>
				<h2 className='title'>Possible Relationships</h2>
				<div className='content content-full'>
					<ul className='default'>
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
									<div className='aligned-row'>
										<div className='label'>
											<h4>Relationship Type</h4>
										</div>
										<div className='content'>
											{relationship.type == 'other' ? 'Friend' : relationship.type}
										</div> 
									</div> 
								: null }

								<TeaserLink
									teaser={relationship}
									classes='btn-link btn'
									recordType={constants.recordTypes.PERSON}> Person Report
								</TeaserLink>
							</li>
						)) }
					</ul>
				</div>
				</section>
			</div>
	);
}

// Validate props
Relationships.propTypes = {
	relationships: React.PropTypes.array.isRequired
}

export default Relationships;