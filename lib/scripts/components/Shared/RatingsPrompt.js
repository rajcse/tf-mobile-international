import constants from '../../constants/pubRecConstants';
import React from 'react';

export default class RatingsPrompt extends React.Component {
   constructor(props) {
           super(props);

           this.state = {
                   successful: false,
                   loading: false,
                   error: false
           };

           this.updatePackage = this.updatePackage.bind(this);
    }
    render(){
		return (
			<div id="ratings-prompt">
				<div className="modal">
					<h3>Help us get better!</h3>
					<p>{props.message}</p>

					<div className="confirm">
						<button className="continue" onClick={props.storeRating}>IT'S GREAT!</button>
					</div>
					
					<div className="cancel">
						<button className="cancel" onClick={props.support}>I DON'T LIKE IT</button>
					</div>
				</div>
			</div>
		);
	}
}

RatingsPrompt.propTypes = {
	message: React.PropTypes.string.isRequired,
	storeRating: React.PropTypes.func.isRequired,
	support: React.PropTypes.func.isRequired
};
