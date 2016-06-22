import config from '../config.js';
import React, { Component } from 'react';
import {Link, IndexLink} from 'react-router';
import Svg from './Svg';

export default class Navigation extends Component {

	render() {
		return (
			<nav id="main-navigation">
				<ul>
					<li>
						<IndexLink to="/" activeClassName="active-nav">
							<Svg svg="navHome" style={{width: 20}} />
							<span>Home</span>
						</IndexLink>
					</li>
					<li>
						<Link to="/search" activeClassName="active-nav">
							<Svg svg="navSearch" style={{width: 25}} />
							<span>Search</span>
						</Link>
					</li>
					<li>
						<Link to="/support" activeClassName="active-nav">
							<Svg svg="navSupport" style={{width: 18}} />
							<span>Help</span>
						</Link>
					</li>
					<li>
						<Link to="/account" activeClassName="active-nav">
							<Svg svg="navAccount" style={{width: 17}} />
							<span>Account</span>
						</Link>
					</li>
				</ul>
			</nav>
		);
	}
};
