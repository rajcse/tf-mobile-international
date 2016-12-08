import React from 'react';
import Svg from 'components/svg/Svg';

const SuccessPrompt = (props) => {
	return (
		<div id="success-prompt">
			<div className="modal modal-transparent">
				<Svg svg="successModal" />
				<h3>Success!</h3>
				<div className="confirm">
					<button className="continue" onClick={props.confirmSuccess}>Continue</button>
				</div>
			</div>
		</div>
	);
};

SuccessPrompt.propTypes = {
	confirmSuccess: React.PropTypes.func
};

export default SuccessPrompt;
