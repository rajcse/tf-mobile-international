import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';

const SimpleList = (props) => {
	let { label, values, classes } = props;

	return (
		<div className='simple-column row'>
			<div className='label label-full'>
				<h4>{label}</h4>
			</div>

			<div className='content content-full'>
				<ul className={classnames('default', classes)}>
					{ values.map((content, i) => (
						<li key={i}>{_.truncate(content, {
							'length': 34,
							'separator': /,? +/
						})}</li>
					)) }
				</ul>
			</div>
		</div>
	);
}

SimpleList.PropTypes = {
	label: React.PropTypes.string.isRequired,
	values: React.PropTypes.array.isRequired,
	classes: React.PropTypes.string
}

export default SimpleList;
