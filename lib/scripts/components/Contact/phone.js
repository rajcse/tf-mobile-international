import React, { Component, PropTypes } from 'react';

const PhoneColumn = (props) => {
	return (
		<div className='table row'>
			<div className='label'>
				<h4>Phone Numbers</h4>
			</div>

			<div className='content content-full'>
				<ul>
					{ props.numbers.map((number, i) =>
						<li key={i}>
                            <h4>{number.carrier}</h4>
							<p><span>{number.display}</span>
                                <span>{number.line_type}</span>
                            </p>
							<p><button className='btn-link pull-right'>Phone Report</button></p>
						</li>
					) }
				</ul>
			</div>
		</div>
	);
}

PhoneColumn.propTypes = {
	numbers: PropTypes.array.isRequired
}

export default PhoneColumn;
