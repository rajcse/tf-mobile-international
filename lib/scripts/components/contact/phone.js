import constants from '../../constants/pubRecConstants';
import React from 'react';
import SearchLink from '../SearchLink';

const PhoneColumn = (props) => {
	return (
		<div className='table simple-column row'>
			<div className='label label-full'>
				<h4>{props.title}</h4>
			</div>

			<div className='content content-full'>
				<ul>
					{ props.numbers.map((number, i) =>
						<li key={i}>
							<h4>{number.display}</h4>

							<p>{number.carrier} - {number.line_type}</p>
							<p>
							<SearchLink
				              criteria={{
				                type: constants.recordTypes.PHONE,
				                query: {
				                  phone: number.number
				                },
				                tel: number.number
				              }}
				              classes='btn-link btn'> Phone Report
				            </SearchLink>
							</p>
						</li>
					) }
				</ul>
			</div>
		</div>
	);
}

PhoneColumn.propTypes = {
	numbers: React.PropTypes.array.isRequired
}

export default PhoneColumn;
