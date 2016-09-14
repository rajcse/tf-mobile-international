import React, { Component, PropTypes } from 'react';
import viewActions from '../../actions/viewActions';
import _ from 'lodash';

class PaymentPrompt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			successful: false,
			loading: false,
			error: false
		};

		this.updatePackage = this.updatePackage.bind(this);
	}

	componentWillReceiveProps() {
		// Check plan type
		// let plan = this.props.sku;
		// let report;

		// if(plan === 'unlim_email_report_4_99') {
		// 	console.log(this.props);
		// 	report = this.props.accountInfo.balances.email_report;
		// } else if (plan === 'unlim_phone_179_1mo') {
		// 	report = this.props.accountInfo.balances.phone_report;
		// } else {
		// 	report = this.props.accountInfo.balances.person_report;
		// }

//		if(_.isNull(report)) {
			this.setState({
				successful: true,
				loading: false
			});
		// } else {
		// 	this.setState({
		// 		error: true,
		// 		loading: false
		// 	});
		// }


	}

	updatePackage() {
		this.setState({
			successful: false,
			loading: true
		});

		setTimeout(() => this.props.confirmCrossSell(), 100);
	}

	render() {
		let {
			name,
			sku,
			cancelCrossSell
		} = this.props;

		let {
			successful,
			loading,
			error
		} = this.state;

		return (
			<div id="payment-prompt">
				{ !successful && !loading ?
					<div className="modal">
						<h3>It appears you don't have access to this content!</h3>

						<p>{name} - {sku}</p>

						<div className="confirm">
							<button className="cancel" onClick={cancelCrossSell}>Cancel</button>
							<button className="continue" onClick={this.updatePackage}>Continue</button>
						</div>
					</div> : null }

				{ successful ?
					<div className="modal">
						<h3>Congratulations! You have purchased a new item</h3>

						<p>{name} - {sku}</p>
						<div className="confirm">
							<button className="continue" onClick={cancelCrossSell}>Go Home</button>
						</div>
					</div> : null }

				{ error ?
					<div className="modal">
						<h3>Something went wrong!</h3>

						<p>Your TruthFinder account was not able to make this purchase. Please revise your payment options</p>
						<div className="confirm">
							<button className="continue" onClick={cancelCrossSell}>Go Home</button>
						</div>
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
	confirmCrossSell: PropTypes.func.isRequired,
	cancelCrossSell: PropTypes.func.isRequired
};

export default PaymentPrompt;
