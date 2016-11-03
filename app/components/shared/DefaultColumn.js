import React, { PropTypes } from 'react';
import Svg from '../Svg';

const DefaultColumn = (props) => {
	let {
		name,
		type,
		icon,
		content,
		title
	} = props;

	return (
		<div className="simple-column row default-column">
			<div className="label label-full">
				<h3>{title}</h3>
			</div>

			<div className="content content-full">
				<div className="content-image">
					<Svg
						className="logo"
						svg={icon}
					/>
				</div>
				<p>{content}</p>
				<p className="note">But remember, we refresh our databases every 24 hours.
					If we uncover new {type} for {name}, we can add that data ASAP!</p>
			</div>
		</div>
	);
};

// Validate props
DefaultColumn.propTypes = {
	name: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

export default DefaultColumn;
