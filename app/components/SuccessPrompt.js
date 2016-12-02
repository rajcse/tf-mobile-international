import React from 'react';
import Svg from 'components/svg/Svg';

function unBlurRecord() {
	// Check that id exist
	if (document.querySelector('#record')) {
		document.querySelector('#record').classList.remove('blur');
	}
}

const SuccessPrompt = (props) => {
	return (
		<div id="success-prompt">
			<div className="modal modal-transparent">
				<Svg svg="successModal" />
				<h3>Success!</h3>
				<div className="confirm">
					<button className="continue" onClick={() => { unBlurRecord(); props.confirmSuccess(); }}>Continue</button>
				</div>
			</div>
		</div>
	);
};

SuccessPrompt.propTypes = {
	confirmSuccess: React.PropTypes.func
};

export default SuccessPrompt;
