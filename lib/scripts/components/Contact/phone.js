import constants from '../../constants/pubRecConstants';
import React from 'react';
import TeaserLink from '../TeaserLink';

const PhoneColumn = (props) => {
	return (
		<div className='table row'>
			<div className='label label-full'>
				<h4>Phone Numbers</h4>
			</div>

			<div className='content content-full'>
				<ul>
					{ props.numbers.map((number, i) =>
						<li key={i}>
							<h4>{number.carrier}</h4>

							<p>
								<span>{number.display}</span>
								<span>{number.line_type}</span>
							</p>

							<p>
								<TeaserLink
									report={number}
									classes='btn-link btn'
									reportType={constants.reportTypes.PHONE}> Phone Report
								</TeaserLink>
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
