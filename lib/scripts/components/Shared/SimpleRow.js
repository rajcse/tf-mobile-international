import React from 'react';

const SimpleRow = (props) => {
	let { title, content } = props;

	return (
		<div className='simple row'>
			<div className='label'>
				<h4>{title}</h4>
			</div>

			<div className='content'>
				<p>{content}</p>
			</div>
		</div>
	);
}

SimpleRow.propTypes = {
	title: React.PropTypes.string.isRequired,
	content: React.PropTypes.string.isRequired,
	icon: React.PropTypes.string,
}

export default SimpleRow;
