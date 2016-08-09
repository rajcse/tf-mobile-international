import constants from '../../constants/pubRecConstants';
import React from 'react';
import TeaserLink from '../TeaserLink';
import _ from 'lodash';

const Associates = (props) => {
	let { associates } = props;

	return (
			<div className='multi-container'>
				<section id='associates' className='widget multi-widget'>
				<h2 className='title'>Possible Associates</h2>
				<div className='content content-full'>
					<ul className='default'>
						{ associates.map((associate, i) => (
							<li key={i}>
								<h4>{associate.names[0].display}</h4>

								{ associate.available_criminal_records >= 1 ?
									<p>
										<small><strong>({associate.available_criminal_records}) </strong>
											Possible Criminal Records
										</small>
									</p> 
								: null }

								{ _.has(associate,'dobs[0].date.month') ? 
									<div className='aligned-row'>
										<div className='label'>
											<h4>Date of Birth</h4>
										</div>
										<div className='content'>
											{constants.months[associate.dobs[0].date.month] + ', ' + associate.dobs[0].date.day + ' ' + associate.dobs[0].date.year}
										</div> 
									</div> 
								: null }

								{ _.has(associate,'date_last_cohabit.date_range.end.month') ? 
									<div className='aligned-row'>
										<div className='label'>
											<h4>Date Last Shared Address</h4>
										</div>
										<div className='content'>
											{constants.months[associate.date_last_cohabit.date_range.end.month] + ', ' + associate.date_last_cohabit.date_range.end.day + ' ' + associate.date_last_cohabit.date_range.end.year}
										</div> 
									</div> 
								: null }

								<TeaserLink
									report={associate}
									classes='btn-link btn'
									reportType={constants.reportTypes.PERSON}> Person Report
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
Associates.propTypes = {
	associates: React.PropTypes.array.isRequired
}

export default Associates;

