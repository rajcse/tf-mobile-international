import React, { Component, PropTypes } from 'react';

export default class RatingsPrompt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			initialModal: true
		};
	}
	
	handleClick(){
		this.setState({
			initialModal: false
		});
	}

	render(){
		if(this.state.initialModal){
			return (
				<div id="ratings-prompt">
					<div className="modal">
						<h3>Help us get better!</h3>
						<p>{this.props.message}</p>

						<div className="confirm">
							<button className="continue" onClick={this.handleClick.bind(this)}>IT'S GREAT!</button>						
							<button className="cancel" onClick={this.props.support}>I DON'T LIKE IT</button>
						</div>
					</div>
				</div>
			);	
		} else {
			return (
				<div id="ratings-prompt">
					<div className="modal">
						<h3>Help us get better!</h3>
						<p>{this.props.message2}</p>

						<div className="confirm">
							<button className="continue" onClick={this.props.confirm}>YES!</button>
							<button className="cancel" onClick={this.props.cancel}>NO</button>
						</div>
					</div>
				</div>
			);
		}
	}
}

RatingsPrompt.propTypes = {
	message: PropTypes.string.isRequired,
	message2: PropTypes.string.isRequired,
	confirm: PropTypes.func.isRequired,
	cancel: PropTypes.func.isRequired,
	support: PropTypes.func.isRequired
};
