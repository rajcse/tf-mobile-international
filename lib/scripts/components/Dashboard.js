import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Support extends Component {
	render() {

		return (
			<div>
				DASHBOARD PAGE!!!<br/>
				<Link to="/people/123xyz">Go to a report</Link><br/>
				<Link to="/people/adjncd">Go to a different report</Link><br/>
				<Link to={'/people/' + Date.now()}>Go to an unseen report</Link>
			</div>
		);
	}
};

var styles = {
};
