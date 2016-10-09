import constants from '../../constants/pubRecConstants';
import React from 'react';

export default class RatingsPrompt extends React.Component {
   constructor(props) {
           super(props);

           this.state = {
                   initialModal: true
           };
    }
	
	_handleClick(){
		this.setState({
			initialModal: false
		})
	}

    render(){
    	if(this.state.initialModal){
    		return (
				<div id="ratings-prompt">
					<div className="modal">
						<h3>Help us get better!</h3>
						<p>{this.props.message}</p>

						<div className="confirm">
							<button className="continue" onClick={this._handleClick.bind(this)}>IT'S GREAT!</button>						
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
	message: React.PropTypes.string.isRequired,
	message2: React.PropTypes.string.isRequired,
	confirm: React.PropTypes.func.isRequired,
	support: React.PropTypes.func.isRequired
};
