import Loader from './shared/Loader';
import React, { Component } from 'react';
import {hashHistory} from 'react-router';

class RecordLoader extends Component {

	constructor(props) {
		super(props);

		this.cancelLoader = this.cancelLoader.bind(this);
	}

	cancelLoader(){
		hashHistory.goBack();
	}

	render(){
		return (
			<div id="record-loader">
				<div>
					{this.props.isPremium ? <p>Congratulations! Your upgrade was successful and we're now loading a Premium Report for...</p> : <p>Loading Report...</p>}
					{this.props.reportName ? <h3>{this.props.reportName}</h3> : null}
					<Loader />
					<br/>
					{(this.props.backButton) ? <div className="cancel-button" onTouchTap={ () => { this.cancelLoader(); } }>Cancel</div> : null }
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
