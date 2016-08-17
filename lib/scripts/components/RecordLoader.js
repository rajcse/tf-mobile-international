import constants from '../constants/pubRecConstants';
import Loader from './Shared/Loader';
import React from 'react';

const RecordLoader = (props) => {
	return (
		<div id="record-loader">
			<div>
				<p>Loading Report...</p>
				<h3>{props.reportName}</h3>
				<Loader />
			</div>
		</div>
	);
}

export default RecordLoader;