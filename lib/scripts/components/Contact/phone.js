import React, { Component, PropTypes } from 'react';

const PhoneColumn = (props) => {
  return (
	<div className='table row'>
		<h4>Phone Numbers</h4>

        <ul>
            { props.numbers.map((number, i) =>
                <li key={i}>
                    {number}
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
