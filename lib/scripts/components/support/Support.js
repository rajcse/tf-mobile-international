import _ from 'lodash';
import React from 'react';
import Header from '../shared/Header';

export default class Support extends React.Component {
	render() {

		return (
			<div id="support">
				<Header title='Member Support' />
				<h2>TruthFinder Support</h2>
				<p>
			    	If you have questions about your account or are experiencing issues, our member care representatives will be happy to assist you. A friendly representative is on hand 24/7 to help you use the site and find the truth you are looking for. Give them a call at (800) 699-8081.
			    </p>
				<a href="tel:18006998081">Call Support</a>
			</div>
		);
	}
};
