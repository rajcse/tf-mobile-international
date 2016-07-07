import React, { Component, PropTypes } from 'react';

const PhoneColumn = (props) => {
  return (
	<div className='table row'>
		<h4 className='label'>Phone Numbers</h4>

        <ul>
            { props.numbers.map((number, i) =>
                <li key={i}>
                    {number.display}
                </li>
            ) }
        </ul>
	</div>
  );
}

PhoneColumn.propTypes = {
    numbers: PropTypes.array.isRequired
}

export default PhoneColumn;
