import Loader from 'components/Loader';
import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import constants from 'constants/pubRecConstants';

class RecordLoader extends Component {

	constructor(props) {
		super(props);

		this.cancelLoader = this.cancelLoader.bind(this);
	}

	componentDidMount() {
		// Hide the status bar
		if(window.StatusBar && window.device && window.device.platform === 'iOS') {
			window.StatusBar.hide();
		}
	}

	componentWillUnmount() {
		// Show the status bar again
		if(window.StatusBar && window.device && window.device.platform === 'iOS') {
			window.StatusBar.show();
		}
	}

	cancelLoader(){
		hashHistory.goBack();
	}

	render(){
		return (
			<div id="record-loader">
				<div>
					{this.props.isPremium ? <p>Congratulations! Your upgrade was successful and we're now loading a Premium Report for...</p> : 
						<div><p>Loading Report...</p><p>{_.shuffle(constants.reportLoaderTeasers)[0]}</p></div>
					}
					{this.props.reportName ? <h3>{this.props.reportName}</h3> : null}
					<Loader />
					<br/>
					{(this.props.backButton) ? <div className="cancel-button" onClick={ () => { this.cancelLoader(); } }>Cancel</div> : null }
				</div>
			</div>
		);
	}
}

RecordLoader.propTypes = {
	reportName: React.PropTypes.string,
	backButton: React.PropTypes.bool,
	isPremium: React.PropTypes.bool
};

export default RecordLoader;
