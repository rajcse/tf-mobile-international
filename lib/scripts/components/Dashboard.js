import config from '../config.js';
import _ from 'lodash';
import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Support extends Component {
	render() {

		return (
			<div>
				DASHBOARD PAGE!!!<br/>
				<Link to="/people/8fa0274d-9c15-4595-9367-c8e1ab595087">Go to Joe's report</Link><br/>
				<Link to="/people/51070b95-0216-4c80-b790-887fb3e6ebf7">Go to Brian's report</Link><br/>
				<Link to={'/people/' + Date.now()}>Go to a broken/unseen report</Link>
			</div>
		);
	}
};

var styles = {
};
