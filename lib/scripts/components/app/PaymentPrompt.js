import React, { Component, PropTypes } from 'react';
import _ from 'lodash';

class PaymentPrompt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			successful: false,
			loading: false,
			error: null
		};

		this.updatePackage = this.updatePackage.bind(this);
	}

	componentWillReceiveProps() {
		console.log(this.props.accountInfo);
		!_.isEmpty(this.props.accountInfo) && !_.isNull(this.props.accountInfo) ?
			this.setState({
				successful: true,
				loading: false
			})
		: null;
	}

	updatePackage() {
		this.setState({
			successful: false,
			loading: true
		});

		console.log(this.state);

		// this.props.confirmCrosssell();
	}

	render() {
		let {
			name,
			sku,
			cancelUpsell,
			// confirmCrosssell
		} = this.props;

		let {
			successful,
			loading
		} = this.state;

		return (
			<div id="payment-prompt">
				{ !successful && !loading ?
					<div className="modal">
						<h3>It appears you don't have access to this content!</h3>

						<p>{name} - {sku}</p>

						<div className="confirm">
							<button className="cancel" onTouchTap={cancelUpsell}>Cancel</button>
							<button className="continue" onTouchTap={this.updatePackage}>Continue</button>
						</div>
					</div> : null }

				{ successful ?
					<div className="modal">
						<h3>Congratulations! You have purchased a new plan</h3>

						<p>{name} - {sku}</p>
					</div> : null }

				{ loading ?
					<div className="modal">
						<h3>Loading...</h3>

						<p>Purchasing {name} - {sku}</p>
					</div> : null }
			</div>
		);
	}
}

PaymentPrompt.propTypes = {
	name: PropTypes.string.isRequired,
	accountInfo: PropTypes.any,
	message: PropTypes.string,
	sku: PropTypes.string.isRequired,
	confirmCrosssell: PropTypes.func.isRequired,
	cancelUpsell: PropTypes.func.isRequired
};

export default PaymentPrompt;
