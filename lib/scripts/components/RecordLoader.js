import constants from '../constants/pubRecConstants';
import Loader from './shared/Loader';
import React, { Component, PropTypes } from 'react';
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
					<p>Loading Report...</p>
					<h3>{this.props.reportName}</h3>
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
	backButton: React.PropTypes.bool
};

export default RecordLoader;
