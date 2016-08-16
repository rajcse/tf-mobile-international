import constants from '../../constants/pubRecConstants';
import React from 'react';
import TeaserLink from '../TeaserLink';

const RelativesColumn = (props) => {
	let { title, relatives } = props;

	return (
		<div className='simple-column row'>
			<div className='label label-full'>
				<h4>{title}</h4>
			</div>

			<div className='content content-full'>
				<ul className='default'>
					{ relatives.map((relative, i) => (
						<li key={i}>
							<h4>{relative.names[0].display}</h4>

							{ relative.available_criminal_records >= 1 ?
								<p>
									<small><strong>({relative.available_criminal_records}) </strong>
										Possible Criminal Records
									</small>
								</p>
							: null }

							<TeaserLink
								teaser={relative}
								classes='btn-link btn'
								recordType={constants.recordTypes.PERSON}> Person Report
							</TeaserLink>
						</li>
					)) }
				</ul>
			</div>
		</div>
	);
}

// Validate props
RelativesColumn.propTypes = {
	relatives: React.PropTypes.array.isRequired
}

export default RelativesColumn;
