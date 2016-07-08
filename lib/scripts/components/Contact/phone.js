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
                            <p><strong>{number.carrier}</strong></p>
							<p><span>{number.display}</span>
                                <span>{number.line_type}</span>
                                <a href='#' className='pull-right'>Phone Report</a>
                            </p>
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
